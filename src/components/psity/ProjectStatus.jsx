import React from 'react';
import SectionLabel from './SectionLabel';

const stages = [
  { n: '01', t: 'Community', d: 'Формирование сообщества-основателя.' },
  { n: '02', t: 'Location', d: 'Выбор и приобретение первой площадки.' },
  { n: '03', t: 'Masterplan', d: 'Архитектура и планирование.' },
  { n: '04', t: 'Founding Residents', d: 'Ранние бронирования.' },
  { n: '05', t: 'Construction', d: 'Инфраструктура + первая жилая фаза.' },
  { n: '06', t: 'Opening', d: 'Первые резиденты въезжают в PSYTY.' },
];

export default function ProjectStatus() {
  return (
    <section className="py-32 lg:py-44 bg-secondary/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel>Статус проекта</SectionLabel>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl">Дорога к PSYTY.</h2>
        <p className="mt-6 text-foreground/75 text-lg font-light max-w-xl leading-[1.7]">PSYTY — концептуальный проект. Мы не выдаём его за построенный.</p>

        <div className="mt-16 flex items-center gap-3">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent">Current stage</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-display text-xl text-accent">01 · Community</span>
        </div>

        <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-6 gap-px bg-border/50">
          {stages.map((s, i) => (
            <div key={s.n} className={`p-8 ${i === 0 ? 'bg-accent/10' : 'bg-background'}`}>
              <span className={`font-display text-4xl ${i === 0 ? 'text-accent' : 'text-foreground/45'}`}>{s.n}</span>
              <h3 className="mt-6 font-display text-xl">{s.t}</h3>
              <p className="mt-2 text-foreground/75 text-[13px] font-light leading-[1.6]">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}