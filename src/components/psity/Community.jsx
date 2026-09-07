import React from 'react';
import SectionLabel from './SectionLabel';
import Mark from './Mark';

const profiles = [
  { role: 'Психотерапевт', en: 'Psychotherapist' },
  { role: 'Нейроучёный', en: 'Neuroscientist' },
  { role: 'Семейный психолог', en: 'Family psychologist' },
  { role: 'Предприниматель', en: 'Entrepreneur' },
  { role: 'Преподаватель', en: 'Teacher' },
  { role: 'Психиатр', en: 'Psychiatrist' },
  { role: 'Исследователь', en: 'Researcher' },
  { role: 'Писатель', en: 'Writer' },
  { role: 'Организационный психолог', en: 'Organizational psychologist' },
];

const ethics = ['Приватность', 'Уважение', 'Профессиональная этика', 'Без незапрошенной терапии', 'Без агрессивного продвижения услуг', 'Без дискриминации школ', 'Конфиденциальность', 'Свобода мысли', 'Научная открытость', 'Уважение личных границ'];

export default function Community() {
  return (
    <section id="community" className="py-32 lg:py-44 bg-secondary/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel>Сообщество</SectionLabel>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl">
          Ваши соседи имеют значение.
        </h2>
        <p className="mt-6 text-foreground/60 text-lg font-light max-w-2xl leading-[1.7]">
          PSYTY — не про жизнь рядом с одинаковыми людьми. Это про жизнь среди людей, разделяющих уважение к рефлексии, развитию, диалогу и психологической культуре.
        </p>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50">
          {profiles.map((p, i) => (
            <div key={i} className="bg-background p-8 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center"><Mark className="w-6 h-6 text-foreground/30" /></div>
              <div>
                <p className="font-display text-xl">{p.role}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">{p.en}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-muted-foreground italic">Профили-прототипы. Реальные резиденты — по мере формирования сообщества.</p>

        <div className="mt-24 pt-12 border-t border-border">
          <SectionLabel>Этика сообщества</SectionLabel>
          <p className="font-display text-2xl max-w-3xl leading-[1.3]">PSYTY не должен стать закрытой идеологической коммуной. Резиденты остаются свободными людьми.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {ethics.map((e) => <span key={e} className="text-[13px] px-4 py-2 border border-border text-foreground/70">{e}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}