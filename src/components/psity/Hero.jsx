import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMG } from './assets';

export default function Hero() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShown(true), 150);
    return () => clearTimeout(t1);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-foreground flex items-center">
      <div className="absolute inset-0">
        <img src={IMG.hero} alt="Aerial view of PSYTY" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/30 to-foreground/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
        <div className={`w-full transition-all duration-1000 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-white">
            <span className="font-display font-bold text-4xl lg:text-6xl tracking-[0.25em]">PSYTY</span>
          </div>
          <p className="mt-4 text-white/90 text-sm lg:text-base font-light tracking-wide">
            Первый в мире город психологов, исследователей и ученых.
          </p>

          <h1 className="mt-10 font-display text-white text-[clamp(1.9rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            Жить, учиться и работать в среде,<br />своей среде.
          </h1>
          <p className="mt-6 font-display text-white/90 text-[clamp(1.15rem,2.5vw,1.7rem)] leading-[1.3]">
            Среда для человека, исследующего и развивающего в человеке Человека.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-3xl">
            <div className="border-l-2 border-white/40 pl-4">
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/80 font-bold">Инфраструктура</p>
              <p className="mt-2 text-white/90 text-[14px] lg:text-[15px] leading-[1.7] font-light">
                Исследовательский, образовательный и реабилитационный центры, библиотека, спортивный клуб с бассейном, детский сад и школа, терренкуры и природа.
              </p>
            </div>
            <div className="border-l-2 border-white/40 pl-4">
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/80 font-bold">Люди</p>
              <p className="mt-2 text-white/90 text-[14px] lg:text-[15px] leading-[1.7] font-light">
                Терапевты, супервизоры, тренеры, исследователи и ученые, единомышленники, собеседники и просто соседи.
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-2xl">
            <p className="font-display text-white text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.15] text-balance">
              Где бы ты не жил сейчас — переезжай.
            </p>
            <p className="mt-3 text-white/85 text-[15px] leading-[1.7] font-light">
              Не просто жить, а созидать, исследовать и формировать новую психологию нового времени для новой страны.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/infrastructure" className="px-7 py-3.5 bg-white text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-white transition-colors">Среда</Link>
            <Link to="/catalogue" className="px-7 py-3.5 border border-white/50 text-white text-[12px] tracking-[0.18em] uppercase hover:bg-white/10 transition-colors">Недвижимость</Link>
            <Link to="/community" className="px-7 py-3.5 border border-white/30 text-white/90 text-[12px] tracking-[0.18em] uppercase hover:bg-white/10 transition-colors">Стать резидентом PSYTY</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 lg:right-10 z-10 hidden sm:flex items-center gap-3 text-white/60 text-[11px] tracking-[0.2em]">
        <span className="w-12 h-px bg-white/40" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}