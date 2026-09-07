import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import Hero from '@/components/psity/Hero';
import BigIdea from '@/components/psity/BigIdea';
import ThreePillars from '@/components/psity/ThreePillars';
import CommunityPrinciples from '@/components/psity/CommunityPrinciples';
import ProjectStatus from '@/components/psity/ProjectStatus';
import Operator from '@/components/psity/Operator';
import FinalSection from '@/components/psity/FinalSection';
import SectionLabel from '@/components/psity/SectionLabel';
import { IMG } from '@/components/psity/assets';

const highlights = [
  { img: IMG.lab, label: 'PSYTY Lab', t: 'Исследования рядом с домом', to: '/study' },
  { img: IMG.farm, label: 'PSYTY Farm', t: 'С фермы — на ваш стол', to: '/live' },
  { img: IMG.library, label: 'PSYTY Library', t: 'Библиотека человеческой природы', to: '/study' },
];

export default function Home() {
  return (
    <>
      <Hero />
      <BigIdea />
      <ThreePillars />
      <CommunityPrinciples />

      <section className="py-28 lg:py-40 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionLabel>Среда и инфраструктура</SectionLabel>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl">
            Не недвижимость — образ жизни.
          </h2>
          <p className="mt-6 text-foreground/75 text-lg font-light max-w-2xl leading-[1.7]">
            Лаборатория, академия, практика, ферма, библиотека, лесные маршруты и дом тишины — всё в шаговой доступности. Это и есть среда PSYTY.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <RRLink key={h.label} to={h.to} className="group block">
                <div className="aspect-[4/3] overflow-hidden border border-border">
                  <img src={h.img} alt={h.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="mt-5 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">{h.label}</p>
                <h3 className="mt-1 font-display text-2xl flex items-center justify-between">{h.t}<span className="text-accent text-sm">→</span></h3>
              </RRLink>
            ))}
          </div>

          <RRLink to="/infrastructure" className="mt-12 inline-block px-7 py-3.5 border border-foreground text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">Вся инфраструктура</RRLink>
        </div>
      </section>

      <ProjectStatus />
      <Operator />
      <FinalSection />
    </>
  );
}