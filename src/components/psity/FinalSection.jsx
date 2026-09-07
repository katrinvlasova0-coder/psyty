import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMG } from './assets';

export default function FinalSection() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2600);
    const t3 = setTimeout(() => setPhase(3), 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0">
        <img src={IMG.final} alt="PSYTY at sunset" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/65 via-foreground/45 to-foreground/85" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className={`font-display text-2xl text-background/85 transition-all duration-1000 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Есть места, где можно жить.
        </p>
        <p className={`mt-4 font-display text-[clamp(1.6rem,4vw,2.8rem)] text-background transition-all duration-1000 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          И есть места, что меняют то, как вы живёте.
        </p>
        <h1 className={`mt-12 font-display text-[clamp(3rem,12vw,9rem)] leading-none tracking-[-0.02em] transition-all duration-1000 ${phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>PSYTY</h1>
        <p className={`mt-4 text-[12px] tracking-[0.3em] uppercase text-background/75 transition-all duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>The City of Psychology · Город Психологии</p>
        <p className={`mt-2 font-display text-xl text-background/85 transition-all duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>Город, построенный вокруг человека.</p>

        <div className={`mt-12 flex flex-wrap justify-center gap-3 transition-all duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/catalogue" className="px-7 py-3.5 bg-background text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-background transition-colors">Выбрать недвижимость</Link>
          <Link to="/community" className="px-7 py-3.5 border border-background/40 text-background text-[12px] tracking-[0.18em] uppercase hover:bg-background/10 transition-colors">Стать Founding Resident</Link>
          <Link to="/contact" className="px-7 py-3.5 border border-background/40 text-background text-[12px] tracking-[0.18em] uppercase hover:bg-background/10 transition-colors">Получить PSYTY Book</Link>
        </div>

        <p className={`mt-16 text-[11px] tracking-[0.25em] uppercase text-background/60 transition-all duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          Your environment shapes you.<br />Choose it consciously.
        </p>
      </div>
    </section>
  );
}