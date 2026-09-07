import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLabel from './SectionLabel';

const privileges = [
  'Приоритетный выбор недвижимости',
  'Ранние ценовые возможности',
  'Участие в обсуждении дизайна сообщества',
  'Статус Founding Resident',
  'Приоритетный доступ к Академии',
  'Приглашения на приватные события',
  'Возможность предлагать проекты PSYTY Lab',
  'Ранний доступ к инфраструктуре',
];

export default function FoundingResidents() {
  const navigate = useNavigate();
  return (
    <section id="founding" className="py-32 lg:py-44 bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel dark>Founding Residents</SectionLabel>
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] max-w-3xl">
          Стать Founding Resident.
        </h2>
        <p className="mt-8 text-background/60 text-lg font-light max-w-2xl leading-[1.7]">
          Первые резиденты не просто покупают недвижимость. Они помогают установить культуру PSYTY.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-background/15">
          {privileges.map((p, i) => (
            <div key={i} className="bg-foreground p-8 flex items-baseline gap-5">
              <span className="font-display text-2xl text-background/30">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-xl text-background/80">{p}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[12px] text-background/40 max-w-xl">Мы не обещаем финансовой доходности. Founding Resident — это участие в формировании среды, а не инвестиционный продукт.</p>

        <button onClick={() => navigate('/contact')} className="mt-10 px-9 py-4 bg-background text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-background transition-colors">
          Стать Founding Resident
        </button>
      </div>
    </section>
  );
}