import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function GalleryItem({ item, idx, onOpen, isAdmin, onEdit, onDelete }) {
  return (
    <div className="group">
      <button onClick={() => onOpen(idx)} className="block w-full">
        <div className="overflow-hidden border border-border bg-secondary">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </button>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.2em] uppercase text-accent">{item.category}</p>
          <h3 className="font-display text-lg leading-tight mt-0.5 truncate">{item.title}</h3>
          {item.caption && <p className="text-foreground/50 text-xs font-light mt-1 line-clamp-2">{item.caption}</p>}
        </div>
        {isAdmin && (
          <div className="flex gap-1.5 shrink-0">
            <button onClick={() => onEdit(item)} className="p-2 border border-border hover:bg-secondary transition-colors" title="Изменить">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onDelete(item)} className="p-2 border border-border hover:border-destructive hover:text-destructive transition-colors" title="Удалить">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}