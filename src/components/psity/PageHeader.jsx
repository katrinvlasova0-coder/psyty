import React from 'react';
import SectionLabel from './SectionLabel';

export default function PageHeader({ label, title, lead }) {
  return (
    <section className="pt-32 lg:pt-44 pb-16 lg:pb-24 bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel dark>{label}</SectionLabel>
        <h1 className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[1] tracking-[-0.02em] max-w-4xl text-balance">{title}</h1>
        {lead && <p className="mt-8 text-background/80 text-lg font-light max-w-2xl leading-[1.7]">{lead}</p>}
      </div>
    </section>
  );
}