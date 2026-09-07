import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from './SectionLabel';

export default function Operator() {
  return (
    <section className="py-28 lg:py-40 bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel dark>Реализатор и миссия</SectionLabel>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl text-balance">
          Проект реализуется АНО «Международный исследовательский центр РУСАЛЕН».
        </h2>
        <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-20">
          <p className="text-background/80 text-lg font-light leading-[1.7]">
            Проект не ставит задачи получения прибыли. Вся формирующаяся в процессе реализации проекта прибавочная стоимость будет направлена на развитие инфраструктуры и улучшение качества PSYTY.
          </p>
          <p className="text-background/70 text-[15px] font-light leading-[1.7]">
            Это означает, что средства остаются внутри сообщества: новые лаборатории, образовательные программы, общественные пространства и экосистемные инициативы — всё, что делает среду PSYTY живее и устойчивее.
          </p>
          <Link to="/mission" className="mt-8 inline-block px-6 py-3 border border-background/40 text-background text-[12px] tracking-[0.18em] uppercase hover:bg-background hover:text-foreground transition-colors">
            Подробнее о миссии →
          </Link>
        </div>
      </div>
    </section>
  );
}