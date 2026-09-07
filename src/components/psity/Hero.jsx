import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Mark from './Mark';
import { IMG } from './assets';

const statements = [
  'Жить. Учиться. Работать. В одном месте.',
  'Среда для людей, исследующих человека.',
  'Город, построенный вокруг человека.',
  'Не недвижимость — образ жизни.',
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % statements.length), 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setShown(true), 150);
    return () => clearTimeout(t1);
  }, []);

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <img src={IMG.hero} alt="Aerial view of PSYTY" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/30 to-foreground/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <Mark className={`hidden sm:block w-12 h-12 mb-8 text-white transition-all duration-[2500ms] ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />

          <h1 className="font-display text-white text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-balance">
            Живи, учись<br />и работай в Среде<br />Своей Среде.
          </h1>

          <div className="mt-8 h-7 overflow-hidden relative">
            {statements.map((s, i) => (
              <p key={i} className={`absolute inset-0 text-white/90 text-lg font-light tracking-wide transition-all duration-700 ${i === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{s}</p>
            ))}
          </div>

          <p className="mt-10 max-w-xl text-white/85 text-[15px] leading-[1.7] font-light">
            Единомышленники, коллеги, собеседники, сотрудники, исследователи, ученые, терапевты и просто соседи.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/infrastructure" className="px-7 py-3.5 bg-white text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-white transition-colors">Изучить среду</Link>
            <Link to="/community" className="px-7 py-3.5 border border-white/40 text-white text-[12px] tracking-[0.18em] uppercase hover:bg-white/10 transition-colors">Стать резидентом</Link>
            <Link to="/contact" className="px-7 py-3.5 border border-white/20 text-white/80 text-[12px] tracking-[0.18em] uppercase hover:bg-white/10 transition-colors">Получить презентацию</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 lg:right-10 z-10 hidden sm:flex items-center gap-3 text-white/50 text-[11px] tracking-[0.2em]">
        <span className="w-12 h-px bg-white/30" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}