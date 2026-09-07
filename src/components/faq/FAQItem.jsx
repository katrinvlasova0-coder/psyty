import React, { useState } from 'react';
import { Plus, Minus, Pencil, Trash2 } from 'lucide-react';

export default function FAQItem({ item, isAdmin, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <div className="flex items-start gap-4 py-5">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex-1 text-left flex items-start justify-between gap-4"
        >
          <span className="font-display text-lg lg:text-xl leading-snug">{item.question}</span>
          {open ? <Minus className="w-5 h-5 shrink-0 text-muted-foreground mt-0.5" /> : <Plus className="w-5 h-5 shrink-0 text-muted-foreground mt-0.5" />}
        </button>
      </div>
      {open && (
        <div className="pb-6 pr-8">
          <p className="text-foreground/70 text-[15px] leading-[1.8] font-light whitespace-pre-wrap">{item.answer}</p>
          {isAdmin && (
            <div className="mt-4 flex gap-2">
              <button onClick={() => onEdit(item)} className="inline-flex items-center gap-1.5 px-4 py-2 border border-border text-[11px] tracking-[0.15em] uppercase hover:bg-secondary transition-colors">
                <Pencil className="w-3.5 h-3.5" /> Изменить
              </button>
              <button onClick={() => onDelete(item)} className="inline-flex items-center gap-1.5 px-4 py-2 border border-border text-[11px] tracking-[0.15em] uppercase hover:border-destructive hover:text-destructive transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Удалить
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}