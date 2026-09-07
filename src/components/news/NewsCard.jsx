import React from 'react';
import { Link } from 'react-router-dom';
import Mark from '@/components/psity/Mark';

export default function NewsCard({ item }) {
  const body = item.body || '';
  const excerpt = body.length > 160 ? body.slice(0, 160).trim() + '…' : body;

  return (
    <Link to={`/news/${item.id}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden border border-border bg-secondary">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Mark className="w-10 h-10 text-foreground/15" />
          </div>
        )}
      </div>
      <p className="mt-4 text-[10px] tracking-[0.2em] uppercase text-accent">{item.category}</p>
      <h3 className="mt-1 font-display text-2xl leading-tight">{item.title}</h3>
      <p className="mt-2 text-foreground/55 text-sm font-light">{excerpt}</p>
      <p className="mt-3 text-[12px] text-muted-foreground">
        {new Date(item.created_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </Link>
  );
}