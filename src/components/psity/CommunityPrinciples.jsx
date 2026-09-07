import React from 'react';
import SectionLabel from './SectionLabel';
import Mark from './Mark';

const groups = [
  {
    n: '01',
    t: 'Исследователи',
    en: 'RESEARCHERS',
    d: 'Нейроучёные, академики и аналитики, для которых PSYTY Lab и библиотека — продолжение дома. Они превращают повседневность в поле изучения человеческой природы.',
  },
  {
    n: '02',
    t: 'Терапевты',
    en: 'THERAPISTS',
    d: 'Психотерапевты, семейные и организационные психологи, психиатры. Practice House и пространства диалога — их профессиональная среда и точка роста.',
  },
  {
    n: '03',
    t: 'Предприниматели',
    en: 'ENTREPRENEURS',
    d: 'Создатели проектов и инициатив, которые превращают идеи в практику. Они дают сообществу ритм, возможности и живую связь с внешним миром.',
  },
];

export default function CommunityPrinciples() {
  return (
    <section className="py-32 lg:py-44 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel>Принципы сообщества</SectionLabel>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl">
          Единство исследователей, терапевтов и предпринимателей.
        </h2>
        <p className="mt-6 text-foreground/75 text-lg font-light max-w-2xl leading-[1.7]">
          PSYTY строится на пересечении трёх профессиональных миров. Вместе они создают среду, где развитие — не отдельное усилие, а естественная часть каждого дня: личного, профессионального и человеческого.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-border/50">
          {groups.map((g) => (
            <div key={g.n} className="bg-background p-10 lg:p-12 flex flex-col min-h-[320px]">
              <span className="font-display text-5xl text-accent/40">{g.n}</span>
              <p className="mt-8 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">{g.en}</p>
              <h3 className="mt-2 font-display text-3xl flex items-center gap-2">{g.t}</h3>
              <p className="mt-4 text-foreground/75 text-[15px] leading-[1.7] font-light">{g.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-border flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <p className="font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.2] text-balance max-w-2xl">
            Среда, где каждый день наполняется смыслом — развития личностного и профессионального.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <Mark className="w-5 h-5 text-foreground/30" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">PSYTY Community</span>
          </div>
        </div>
      </div>
    </section>
  );
}