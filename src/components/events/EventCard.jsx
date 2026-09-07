import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, MapPin, Pencil, Trash2 } from 'lucide-react';

export default function EventCard({ event, isAdmin, onEdit, onDelete }) {
  const d = event.date ? new Date(event.date) : null;
  return (
    <div className="group border border-border bg-card flex flex-col">
      {event.image_url && (
        <Link to={`/events/${event.id}`} className="block overflow-hidden bg-secondary">
          <div className="aspect-[16/10] overflow-hidden">
            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </Link>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase">
          <span className="text-accent">{event.category}</span>
          {d && <span className="text-muted-foreground">{format(d, 'd MMM', { locale: ru })}</span>}
        </div>
        <h3 className="mt-3 font-display text-2xl leading-tight">
          <Link to={`/events/${event.id}`} className="hover:opacity-70 transition-opacity">{event.title}</Link>
        </h3>
        {event.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="w-3.5 h-3.5" /> {event.location}</p>
        )}
        {event.description && <p className="mt-3 text-foreground/60 text-sm font-light line-clamp-2">{event.description}</p>}
        <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-border/60">
          {d ? (
            <span className="flex items-center gap-1.5 text-[13px] text-foreground/70"><Calendar className="w-3.5 h-3.5" /> {format(d, 'd MMMM, HH:mm', { locale: ru })}</span>
          ) : <span />}
          {isAdmin && (
            <div className="flex gap-1.5">
              <button onClick={() => onEdit(event)} className="p-2 border border-border hover:bg-secondary transition-colors" title="Изменить"><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={() => onDelete(event)} className="p-2 border border-border hover:border-destructive hover:text-destructive transition-colors" title="Удалить"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}