import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Mark from '@/components/psity/Mark';

export default function TopicDetail({ topicId, onBack }) {
  const [topic, setTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const t = await base44.entities.ForumTopic.get(topicId);
      setTopic(t);
      const r = await base44.entities.ForumReply.filter({ topic_id: topicId }, 'created_date', 200);
      setReplies(r || []);
    } catch (e) {
      setError(e.message || 'Не удалось загрузить тему.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [topicId]);

  const submitReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await base44.entities.ForumReply.create({ topic_id: topicId, body: reply.trim() });
      setReply('');
      load();
    } catch (err) {
      setError(err.message || 'Не удалось отправить ответ.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="py-16 text-center">
        <p className="text-foreground/60">{error || 'Тема не найдена.'}</p>
        <button onClick={onBack} className="mt-6 px-6 py-3 border border-border text-[12px] tracking-[0.18em] uppercase hover:bg-secondary transition-colors">← К обсуждениям</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="text-[12px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors">← К обсуждениям</button>

      <article className="mt-6 border-b border-border pb-8">
        <span className="text-[10px] tracking-[0.2em] uppercase text-accent">{topic.category}</span>
        <h2 className="mt-2 font-display text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.1] text-balance">{topic.title}</h2>
        <div className="mt-4 flex items-center gap-4 text-[12px] text-muted-foreground">
          <span>{topic.created_by || 'Резидент'}</span>
          <span>{new Date(topic.created_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <p className="mt-6 text-foreground/70 text-[15px] leading-[1.8] whitespace-pre-wrap font-light">{topic.body}</p>
      </article>

      <div className="mt-10">
        <h3 className="font-display text-2xl">Ответы · {replies.length}</h3>
        <div className="mt-6 space-y-6">
          {replies.length === 0 && (
            <p className="text-foreground/50 text-sm font-light italic">Пока нет ответов. Будьте первым.</p>
          )}
          {replies.map((r) => (
            <div key={r.id} className="flex gap-4 border-l-2 border-border pl-5">
              <Mark className="w-5 h-5 text-foreground/20 shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                  <span>{r.created_by || 'Резидент'}</span>
                  <span>{new Date(r.created_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
                </div>
                <p className="mt-2 text-foreground/70 text-[15px] leading-[1.7] whitespace-pre-wrap font-light">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={submitReply} className="mt-10 border border-border p-5">
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Ваш ответ</label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          className="mt-3 w-full bg-transparent border border-border p-3 focus:outline-none focus:border-foreground text-[15px] leading-[1.7] resize-y"
          placeholder="Присоединитесь к обсуждению..."
        />
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={submitting || !reply.trim()} className="mt-4 px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50">
          {submitting ? 'Отправка...' : 'Ответить'}
        </button>
      </form>
    </div>
  );
}