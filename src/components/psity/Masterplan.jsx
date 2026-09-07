import React, { useState } from 'react';
import SectionLabel from './SectionLabel';

const zones = [
  { name: 'Central Square', desc: 'Пешеходное сердце общественной жизни', x: 175, y: 130, r: 22 },
  { name: 'PSYTY Lab', desc: 'Исследовательская среда 24/7', x: 90, y: 80, r: 18 },
  { name: 'Academy', desc: 'Лекции, супервизии, интенсивы', x: 270, y: 70, r: 18 },
  { name: 'Practice House', desc: 'Профессиональные пространства', x: 60, y: 170, r: 16 },
  { name: 'Health & Recovery', desc: 'Wellness-кампус', x: 300, y: 165, r: 18 },
  { name: 'Library', desc: 'Читальные залы до поздней ночи', x: 180, y: 60, r: 16 },
  { name: 'Silent House', desc: 'Дом тишины в лесу', x: 50, y: 240, r: 14 },
  { name: 'Farm', desc: 'Регенеративная ферма и рынок', x: 320, y: 245, r: 18 },
  { name: 'Forest Trails', desc: 'Сеть маршрутов для разговоров', x: 220, y: 230, r: 20 },
  { name: 'Hotel & Bakery', desc: 'Места случайных встреч', x: 120, y: 250, r: 14 },
];

const surroundings = ['Озеро', 'Лес', 'Спортивный клуб', 'Школа', 'Детский сад', 'Амфитеатр', 'Галерея', 'Книжный магазин'];

export default function Masterplan() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-28 lg:py-40 bg-foreground text-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel dark>Карта среды</SectionLabel>
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] max-w-3xl">
          Среда, а не только недвижимость.
        </h2>
        <p className="mt-6 text-background/60 text-lg font-light max-w-xl leading-[1.7]">
          PSYTY строится вокруг инфраструктуры для жизни, учёбы и работы. Дома — лишь часть окружения.
        </p>

        <div className="mt-16 grid lg:grid-cols-[360px_1fr] gap-12">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-background/40 mb-4">Узлы среды</p>
            <div className="space-y-1">
              {zones.map((z) => (
                <button key={z.name} onMouseEnter={() => setActive(z)} onClick={() => setActive(z)} className={`w-full text-left flex flex-col py-2.5 border-b border-background/10 transition-colors ${active?.name === z.name ? 'text-background' : 'text-background/50'}`}>
                  <span className="font-display text-lg">{z.name}</span>
                  <span className="text-[12px] font-light text-background/40">{z.desc}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-background/40 mt-8 mb-3">Окружение</p>
            <div className="flex flex-wrap gap-2">
              {surroundings.map((i) => <span key={i} className="text-[11px] px-2.5 py-1 border border-background/20 text-background/60">{i}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}