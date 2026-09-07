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

        <div className="mt-16 grid lg:grid-cols-[1fr_360px] gap-12">
          <div className="relative aspect-[4/3] border border-background/20 overflow-hidden bg-foreground">
            <svg viewBox="0 0 380 300" className="w-full h-full">
              <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" fill="none">
                {Array.from({ length: 14 }).map((_, i) => <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="300" />)}
                {Array.from({ length: 11 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 28} x2="380" y2={i * 28} />)}
              </g>
              {zones.map((z) => (
                <g key={z.name} onMouseEnter={() => setActive(z)} onMouseLeave={() => setActive(null)} onClick={() => setActive(z)} className="cursor-pointer">
                  <circle cx={z.x} cy={z.y} r={active?.name === z.name ? z.r + 4 : z.r} fill={active?.name === z.name ? 'hsl(150 8% 40%)' : 'rgba(255,255,255,0.06)'} stroke="rgba(255,255,255,0.4)" strokeWidth="1" className="transition-all duration-300" />
                  <text x={z.x} y={z.y + z.r + 12} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="Inter" letterSpacing="0.5">{z.name}</text>
                </g>
              ))}
            </svg>
            <div className="absolute bottom-3 left-3 text-background/40 text-[10px] tracking-widest">ENVIRONMENT MAP · CONCEPTUAL</div>
          </div>

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