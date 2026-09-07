import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import SectionLabel from '@/components/psity/SectionLabel';
import TopicList from '@/components/forum/TopicList';
import NewTopicForm from '@/components/forum/NewTopicForm';
import TopicDetail from '@/components/forum/TopicDetail';
import ProfileForm from '@/components/profile/ProfileForm';

export default function CabinetPage() {
  const { user, checkUserAuth } = useAuth();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const loadTopics = useCallback(async () => {
    setLoading(true);
    try {
      const list = await base44.entities.ForumTopic.list('-created_date', 100);
      setTopics(list || []);
    } catch (e) {
      setTopics([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTopics(); }, [loadTopics]);

  const handleCreate = async (data) => {
    await base44.entities.ForumTopic.create(data);
    await loadTopics();
    setView('list');
  };

  const openTopic = (id) => {
    setSelectedTopicId(id);
    setView('topic');
  };

  const backToList = () => {
    setView('list');
    loadTopics();
  };

  return (
    <div className="pt-32 lg:pt-40 pb-28 min-h-screen bg-background">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <SectionLabel>Личный кабинет резидента</SectionLabel>
        <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] text-balance">
          Здравствуйте, {user?.full_name || user?.email || 'будущий резидент'}.
        </h1>
        <p className="mt-6 text-foreground/60 text-lg font-light max-w-2xl leading-[1.7]">
          Это ваше пространство PSYTY. Здесь вы участвуете в обсуждениях концепции сообщества, делитесь идеями и формируете среду будущего резидента вместе с другими участниками.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="px-6 py-3 border border-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
            Заполнить заявку резидента
          </Link>
          {view !== 'new' && (
            <button onClick={() => setView('new')} className="px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
              Создать тему
            </button>
          )}
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <SectionLabel>Профиль резидента</SectionLabel>
          <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.1] max-w-2xl">Расскажите о себе.</h2>
          <p className="mt-4 text-foreground/60 text-[15px] font-light max-w-2xl leading-[1.7]">
            Сфера интересов, профессиональные навыки и ожидания от сообщества помогают находить единомышленников и формировать среду PSYTY.
          </p>
          <div className="mt-8">
            <ProfileForm user={user} onSaved={checkUserAuth} />
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <SectionLabel>Обсуждения концепции PSYTY</SectionLabel>
          {view === 'new' && (
            <NewTopicForm onCreate={handleCreate} onCancel={() => setView('list')} />
          )}
          {view === 'topic' && selectedTopicId && (
            <TopicDetail topicId={selectedTopicId} onBack={backToList} />
          )}
          {view === 'list' && (
            <TopicList topics={topics} loading={loading} onSelect={openTopic} />
          )}
        </div>
      </div>
    </div>
  );
}