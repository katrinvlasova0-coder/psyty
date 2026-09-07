import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaBand({ title, to = '/contact', label = 'Связаться с нами' }) {
  return (
    <section className="py-28 lg:py-36 bg-foreground text-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-balance">{title}</h2>
        <Link to={to} className="mt-10 inline-block px-8 py-4 bg-background text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-background transition-colors">{label}</Link>
      </div>
    </section>
  );
}