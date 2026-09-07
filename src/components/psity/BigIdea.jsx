import React from 'react';
import SectionLabel from './SectionLabel';

const choices = ['страну', 'город', 'школу', 'университет', 'карьеру', 'партнёра', 'дом'];

export default function BigIdea() {
  return (
    <section id="concept" className="py-32 lg:py-48 bg-background">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <SectionLabel>Большая идея</SectionLabel>
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-balance max-w-4xl">
          Почему мы выбираем дом,<br className="hidden sm:block" /> но не выбираем среду?
        </h2>

        <div className="mt-16 grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-foreground/70 text-lg leading-[1.7] font-light">
              Мы тщательно выбираем:
            </p>
            <ul className="mt-6 space-y-3">
              {choices.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 border-b border-border/50 pb-3">
                  <span className="font-display text-muted-foreground/70 text-sm w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-2xl text-foreground/80">{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-foreground/75 text-[15px] leading-[1.7] font-light">
              Но редко осознанно выбираем людей и интеллектуальную среду, которая окружает нас каждый день.
            </p>
          </div>

          <div className="lg:pt-16">
            <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.2] text-accent">
              PSYTY меняет это.
            </p>
            <p className="mt-6 text-foreground/70 text-lg leading-[1.7] font-light">
              PSYTY позволяет человеку выбрать не только свой дом —<br />но и свою среду.
            </p>
            <div className="mt-10 h-px psi-rule" />
            <p className="mt-10 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">Your environment shapes your mind.<br />Choose your environment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}