import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import PageHeader from '@/components/psity/PageHeader';
import SectionLabel from '@/components/psity/SectionLabel';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Event.get(id)
      .then((e) => setEvent(e))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 flex items-center justify-center min-h-[60vh]">
        <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-40 pb-20 text-center">
        <p className="text-foreground/60 font-light">Мероприятие не найдено.</p>
        <Link to="/events" className="mt-6 inline-block text-sm text-accent hover:opacity-70">← Все мероприятия</Link>
      </div>
    );
  }

  const d = event.date ? new Date(event.date) : null;
  const isPast = d && d < new Date();

  return (
    <>
      <PageHeader label={event.category} title={event.title} />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link to="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Все мероприятия
          </Link>

          <div className="flex flex-wrap items-center gap-5 text-[13px] text-foreground/70">
            {d && (
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(d, 'd MMMM yyyy, HH:mm', { locale: ru })}</span>
            )}
            {event.location && (
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.location}</span>
            )}
            {isPast && <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground border border-border px-3 py-1">Прошло</span>}
          </div>

          {event.image_url && (
            <div className="mt-8 overflow-hidden border border-border">
              <img src={event.image_url} alt={event.title} className="w-full object-cover" />
            </div>
          )}

          {event.description && (
            <div className="mt-10 prose-psity">
              <SectionLabel>О мероприятии</SectionLabel>
              <p className="mt-4 text-foreground/75 text-[16px] leading-[1.8] font-light whitespace-pre-wrap">{event.description}</p>
            </div>
          )}

          {event.registration_url && !isPast && (
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity"
            >
              Зарегистрироваться <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </section>
    </>
  );
}