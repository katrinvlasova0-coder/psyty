import React from 'react';
import SectionLabel from './SectionLabel';

export default function Facility({ id, label, title, lead, body, image, items, dark, reverse, tagline }) {
  return (
    <section id={id} className={`py-28 lg:py-40 ${dark ? 'bg-foreground text-background' : 'bg-background'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel dark={dark}>{label}</SectionLabel>
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] text-balance">{title}</h2>
            {lead && <p className={`mt-6 text-lg font-light leading-[1.7] ${dark ? 'text-background/70' : 'text-foreground/70'}`}>{lead}</p>}
            {body && <p className={`mt-4 text-[15px] font-light leading-[1.7] ${dark ? 'text-background/55' : 'text-foreground/55'}`}>{body}</p>}
            {items && (
              <div className="mt-8 flex flex-wrap gap-2">
                {items.map((it) => <span key={it} className={`text-[12px] px-3 py-1.5 border ${dark ? 'border-background/20 text-background/60' : 'border-border text-foreground/60'}`}>{it}</span>)}
              </div>
            )}
            {tagline && <p className={`mt-8 text-[11px] tracking-[0.25em] uppercase ${dark ? 'text-background/40' : 'text-muted-foreground'}`}>{tagline}</p>}
          </div>
          <div className="aspect-[4/3] overflow-hidden border border-border">
            {image ? <img src={image} alt={title} className="w-full h-full object-cover" /> : <div className={`w-full h-full flex items-center justify-center ${dark ? 'bg-background/5' : 'bg-secondary'}`}><span className="text-[11px] tracking-[0.3em] uppercase text-foreground/20">{label}</span></div>}
          </div>
        </div>
      </div>
    </section>
  );
}