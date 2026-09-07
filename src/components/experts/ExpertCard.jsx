import React from 'react';
import Mark from '@/components/psity/Mark';

export default function ExpertCard({ item, isAdmin, onEdit, onDelete }) {
  return (
    <div className="border border-border bg-background flex flex-col">
      <div className="aspect-[4/5] overflow-hidden bg-secondary">
        {item.photo_url ? (
          <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Mark className="w-12 h-12 text-foreground/15" />
          </div>
        )}
      </div>
      <div className="p-5 lg:p-6 flex-1 flex flex-col">
        <span className="text-[10px] tracking-[0.2em] uppercase text-accent">{item.type}</span>
        <h3 className="mt-1 font-display text-2xl leading-tight">{item.name}</h3>
        {item.position && <p className="mt-1 text-[13px] text-muted-foreground">{item.position}</p>}
        {item.bio && <p className="mt-3 text-foreground/60 text-sm font-light leading-[1.6]">{item.bio}</p>}
        {item.interests && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Профессиональные интересы</p>
            <p className="mt-1 text-foreground/70 text-sm font-light leading-[1.6]">{item.interests}</p>
          </div>
        )}
        {isAdmin && (
          <div className="mt-5 flex gap-2">
            <button onClick={() => onEdit(item)} className="px-4 py-2 border border-border text-[11px] tracking-[0.15em] uppercase hover:bg-secondary transition-colors">Изменить</button>
            <button onClick={() => onDelete(item)} className="px-4 py-2 border border-border text-[11px] tracking-[0.15em] uppercase hover:border-destructive hover:text-destructive transition-colors">Удалить</button>
          </div>
        )}
      </div>
    </div>
  );
}