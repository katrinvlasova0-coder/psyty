import React from 'react';
import Mark from './Mark';

export default function SectionLabel({ children, dark }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Mark className={`w-5 h-5 ${dark ? 'text-white/40' : 'text-foreground/30'}`} />
      <span className={`text-[11px] tracking-[0.25em] uppercase ${dark ? 'text-white/75' : 'text-muted-foreground'}`}>{children}</span>
    </div>
  );
}