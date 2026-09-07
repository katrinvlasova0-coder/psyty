import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import SectionLabel from '@/components/psity/SectionLabel';
import TopicList from '@/components/forum/TopicList';
import NewTopicForm from '@/components/forum/NewTopicForm';
import TopicDetail from '@/components/forum/TopicDetail';

const CATEGORIES = ['Все', 'Концепция PSYTY', 'Инфраструктура', 'Сообщество', 'Образование', 'Практика', 'Другое'];

export default function ForumPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('Все');
  const [view, setView] = useState('list');
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const load = useCallback(async () => {
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

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(
    () => (activeCat === 'Все' ? topics : topics.filter((t) => t.category === activeCat)),
    [topics, activeCat]
  );

  const participants = useMemo(() => {
    const map = new Map();
    topics.forEach((t) => {
      if (t.created_by) map.set(t.created_by, (map.get(t.created_by) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [topics]);

  const handleCreate = async (data) => {
    await base44.entities.ForumTopic.create(data);
    await load();
    setView('list');
  };

  const openTopic = (id) => {
    setSelectedTopicId(id);
    setView('topic');
  };

  const backToList = () => {
    setView('list');
    load();
  };

  return (
    <div className="pt-32 lg:pt-40 pb-28 min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel>Форум резидентов</SectionLabel>
        <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] text-balance max-w-3xl">
          Обсуждение концепции PSYTY.
        </h1>
        <p className="mt-6 text-foreground/60 text-lg font-light max-w-2xl leading-[1.7]">
          Пространство для будущих резидентов: делитесь идеями, предлагайте, спорьте и находите единомышленников. Среда формируется вместе.
        </p>

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <div className="min-w-0">
            {view === 'list' && (
              <>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCat(c)}
                      className={`px-3 py-1.5 text-[12px] border transition-colors ${activeCat === c ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground/70 hover:border-foreground'}`}
                    >
                      {c}
                    </button>
                  ))}
                  <button
                    onClick={() => setView('new')}
                    className="ml-auto px-5 py-2.5 bg-foreground text-background text-[12px] tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
                  >
                    + Новая тема
                  </button>
                </div>
                <TopicList topics={filtered} loading={loading} onSelect={openTopic} />
              </>
            )}
            {view === 'new' && (
              <NewTopicForm onCreate={handleCreate} onCancel={() => setView('list')} />
            )}
            {view === 'topic' && selectedTopicId && (
              <TopicDetail topicId={selectedTopicId} onBack={backToList} />
            )}
          </div>

          <aside className="lg:border-l lg:border-border lg:pl-10">
            <SectionLabel>Активные участники</SectionLabel>
            {participants.length === 0 ? (
              <p className="text-foreground/50 text-sm font-light">Пока нет активных авторов.</p>
            ) : (
              <ul className="space-y-3">
                {participants.map(([name, count]) => (
                  <li key={name} className="flex items-center justify-between text-sm gap-3">
                    <span className="text-foreground/80 truncate">{name}</span>
                    <span className="text-[11px] text-muted-foreground tracking-wide shrink-0">{count} тем(а)</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="font-display text-xl">Всего тем</p>
              <p className="mt-1 font-display text-4xl">{topics.length}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}