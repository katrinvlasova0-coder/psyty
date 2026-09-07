import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from './SectionLabel';
import Mark from './Mark';

const pillars = [
  { n: '01', t: 'Жить', to: '/live', en: 'LIVE',
    d: 'Среда для повседневной жизни: ферма, площадь, библиотека, тишина леса, wellness и место для случайных встреч.' },
  { n: '02', t: 'Учиться', to: '/study', en: 'STUDY',
    d: 'Академия, PSYTY Lab, библиотека и лаборатория снов — непрерывное образование и исследования рядом с домом.' },
  { n: '03', t: 'Работать', to: '/work', en: 'WORK',
    d: 'Practice House, исследовательские и профессиональные пространства — практика и карьера без поездок.' },
];

export default function ThreePillars() {
  return (
    <section className="py-32 lg:py-44 bg-secondary/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel>Три опоры одной среды</SectionLabel>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl">
          Жить, учиться и работать — в одном месте.
        </h2>
        <p className="mt-6 text-foreground/75 text-lg font-light max-w-2xl leading-[1.7]">
          PSYTY объединяет три обычно разделённые сферы жизни в одну среду. Это и есть главная ценность — не квадратные метры, а возможности каждый день.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-border/50">
          {pillars.map((it) => (
            <Link key={it.n} to={it.to} className="group bg-background p-10 lg:p-12 flex flex-col min-h-[340px] hover:bg-card transition-colors">
              <span className="font-display text-5xl text-accent/40">{it.n}</span>
              <p className="mt-8 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">{it.en}</p>
              <h3 className="mt-2 font-display text-3xl flex items-center gap-2">{it.t}</h3>
              <p className="mt-4 text-foreground/75 text-[15px] leading-[1.7] font-light flex-1">{it.d}</p>
              <span className="mt-6 text-[11px] tracking-[0.18em] uppercase text-accent group-hover:text-foreground transition-colors">Подробнее →</span>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="font-display text-[clamp(1.6rem,4vw,3rem)] leading-[1.15] text-balance max-w-3xl mx-auto">
            Вы выбираете не квадратные метры.<br />Вы выбираете свою среду.
          </p>
          <p className="mt-4 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">You are not buying square meters. You are choosing your environment.</p>
        </div>
      </div>
    </section>
  );
}