import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/psity/PageHeader';
import SectionLabel from '@/components/psity/SectionLabel';
import Mark from '@/components/psity/Mark';

const directions = [
  {
    n: '01',
    t: 'Исследовательская инфраструктура',
    d: 'PSYTY Lab, лаборатория снов, библиотека и экспериментальные площадки. Средства идут на оборудование, приборную базу и поддержку научных программ — чтобы исследования человеческой природы велись здесь, а не за тридевять земель.',
  },
  {
    n: '02',
    t: 'Образовательные программы',
    d: 'Академия PSYTY, резидентуры, стажировки и открытые лекции. Реинвестиции формируют стипендиальный фонд и делают качественное образование доступным для жителей города.',
  },
  {
    n: '03',
    t: 'Общественные пространства',
    d: 'Площадь, дома тишины, маршруты леса и wellness-зоны. Прибыль возвращается в содержание и развитие пространств, открытых не только резидентам, но и городу.',
  },
  {
    n: '04',
    t: 'Экосистемные инициативы',
    d: 'PSYTY Farm, локальное производство, культурные и социальные проекты. Средства поддерживают то, что делает среду живой и самодостаточной круглый год.',
  },
];

const cityImpact = [
  'Новые рабочие места в исследованиях, образовании и сервисе',
  'Доступные городу лекции, программы и публичные пространства',
  'Развитие локальной фермы и продовольственной экосистемы',
  'Современная инфраструктура, обслуживающая не только PSYTY',
  'Поддержка городских культурных и социальных инициатив',
  'Приток специалистов, которые живут и работают в городе',
];

export default function MissionPage() {
  return (
    <>
      <PageHeader
        label="Миссия"
        title="АНО «Международный исследовательский центр РУСАЛЕН»"
        lead="Некоммерческая организация, которая реализует PSYTY и направляет все средства на развитие среды, инфраструктуры и качества жизни — внутри сообщества и в нашем городе."
      />

      {/* Миссия */}
      <section className="py-28 lg:py-40 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionLabel>О центре</SectionLabel>
              <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[1.15] max-w-xl">
                Прибыль — не цель. Среда — цель.
              </h2>
              <p className="mt-6 text-foreground/60 text-lg font-light leading-[1.7]">
                АНО «Международный исследовательский центр РУСАЛЕН» создаёт PSYTY как исследовательскую и общественную среду, а не как коммерческий девелопмент. Проект не ставит задачи получения прибыли: вся прибавочная стоимость, формирующаяся в процессе реализации, направляется обратно — на развитие инфраструктуры и улучшение качества среды.
              </p>
            </div>
            <div className="lg:pt-32">
              <p className="text-foreground/50 text-[15px] font-light leading-[1.7]">
                Это означает, что средства остаются внутри сообщества. Новые лаборатории, образовательные программы, общественные пространства и экосистемные инициативы — всё, что делает среду PSYTY живее и устойчивее, — финансируется из стоимости, которую создаёт само сообщество.
              </p>
              <div className="mt-10 flex items-center gap-3">
                <Mark className="w-5 h-5 text-foreground/30" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">Некоммерческая миссия</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Куда направляются инвестиции */}
      <section className="py-28 lg:py-40 bg-secondary/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionLabel>Куда направляются инвестиции</SectionLabel>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl">
            Инвестиции в PSYTY — это инвестиции в среду.
          </h2>
          <p className="mt-6 text-foreground/60 text-lg font-light max-w-2xl leading-[1.7]">
            Средства, поступающие от резидентов и участников проекта, не уходят в сторону — они работают на территории. Они превращаются в исследовательские мощности, образовательные программы и пространства, которыми пользуется город.
          </p>

          <div className="mt-16 grid md:grid-cols-2 gap-px bg-border/50">
            {directions.map((d) => (
              <div key={d.n} className="bg-background p-10 lg:p-12 flex flex-col">
                <span className="font-display text-5xl text-accent/40">{d.n}</span>
                <h3 className="mt-8 font-display text-2xl">{d.t}</h3>
                <p className="mt-4 text-foreground/60 text-[15px] leading-[1.7] font-light">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Влияние на город */}
      <section className="py-28 lg:py-40 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionLabel dark>Качество жизни в городе</SectionLabel>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl text-balance">
            PSYTY развивается вместе с городом, а не вместо него.
          </h2>
          <p className="mt-6 text-background/60 text-lg font-light max-w-2xl leading-[1.7]">
            Развитие инфраструктуры PSYTY — это развитие инфраструктуры нашего города. Лаборатории, академия, ферма и общественные пространства создают рабочие места, образовательные возможности и культуру, доступную жителям города.
          </p>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-background/10">
            {cityImpact.map((c) => (
              <div key={c} className="bg-foreground p-8 flex items-start gap-4">
                <Mark className="w-5 h-5 text-white/30 shrink-0 mt-1" />
                <p className="text-background/80 text-[15px] font-light leading-[1.6]">{c}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-background/15">
            <p className="font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.2] text-balance max-w-3xl">
              Реинвестируя в среду, мы инвестируем в жизнь города — сегодня и на поколения вперёд.
            </p>
            <Link to="/contact" className="mt-10 inline-block px-7 py-3.5 border border-background text-background text-[12px] tracking-[0.18em] uppercase hover:bg-background hover:text-foreground transition-colors">
              Связаться с командой
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}