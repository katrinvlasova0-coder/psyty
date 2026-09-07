import React from 'react';
import Mark from '@/components/psity/Mark';

const CAT_LABEL = {
  'Концепция PSYTY': 'Концепция',
  'Инфраструктура': 'Инфраструктура',
  'Сообщество': 'Сообщество',
  'Образование': 'Образование',
  'Практика': 'Практика',
  'Другое': 'Другое',
};

export default function TopicList({ topics, loading, onSelect }) {
  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!topics || topics.length === 0) {
    return (
      <div className="py-16 border border-dashed border-border text-center">
        <Mark className="w-8 h-8 text-foreground/20 mx-auto" />
        <p className="mt-4 font-display text-2xl">Пока нет обсуждений</p>
        <p className="mt-2 text-foreground/50 text-sm font-light">Станьте первым, кто откроет тему о концепции PSYTY.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-border">
      {topics.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className="w-full text-left border-b border-border py-6 lg:py-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 hover:bg-secondary/40 transition-colors px-2"
        >
          <div className="flex-1 min-w-0">
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent">{CAT_LABEL[t.category] || t.category}</span>
            <h3 className="mt-1 font-display text-xl lg:text-2xl truncate">{t.title}</h3>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-muted-foreground shrink-0">
            <span className="hidden sm:inline">{t.created_by || 'Резидент'}</span>
            <span>{new Date(t.created_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
            <span className="text-foreground/40">→</span>
          </div>
        </button>
      ))}
    </div>
  );
}