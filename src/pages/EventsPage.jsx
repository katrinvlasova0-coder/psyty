import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import PageHeader from '@/components/psity/PageHeader';
import SectionLabel from '@/components/psity/SectionLabel';
import EventCard from '@/components/events/EventCard';
import EventForm from '@/components/events/EventForm';

const CATEGORIES = ['Все', 'Встреча резидентов', 'Лекция', 'Обсуждение', 'Мастер-класс', 'Другое'];

export default function EventsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('Все');
  const [editingId, setEditingId] = useState(null); // null | 'new' | item.id

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await base44.entities.Event.list('-created_date', 200);
      setItems(list || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = active === 'Все' ? items : items.filter((i) => i.category === active);
  const now = new Date();
  const upcoming = filtered.filter((e) => e.date && new Date(e.date) >= now).sort((a, b) => new Date(a.date) - new Date(b.date));
  const past = filtered.filter((e) => e.date && new Date(e.date) < now).sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleCreate = async (data) => {
    await base44.entities.Event.create(data);
    setEditingId(null);
    await load();
  };

  const handleUpdate = async (data) => {
    await base44.entities.Event.update(editingId, data);
    setEditingId(null);
    await load();
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Удалить это мероприятие?')) return;
    await base44.entities.Event.delete(item.id);
    await load();
  };

  const renderGrid = (list) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((event) =>
        editingId === event.id ? (
          <div key={event.id} className="sm:col-span-2 lg:col-span-3">
            <EventForm initial={event} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
          </div>
        ) : (
          <EventCard key={event.id} event={event} isAdmin={isAdmin} onEdit={(it) => setEditingId(it.id)} onDelete={handleDelete} />
        )
      )}
    </div>
  );

  return (
    <>
      <PageHeader
        label="Мероприятия"
        title="Анонсы жизни PSYTY."
        lead="Встречи резидентов, лекции и обсуждения — планируйте своё участие в жизни сообщества."
      />

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-[12px] tracking-[0.15em] uppercase border transition-colors ${active === c ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground/70 hover:border-foreground'}`}
              >
                {c}
              </button>
            ))}
          </div>

          {isAdmin && editingId !== 'new' && (
            <button
              onClick={() => setEditingId('new')}
              className="mb-8 px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity"
            >
              + Добавить мероприятие
            </button>
          )}
          {editingId === 'new' && (
            <div className="mb-10">
              <EventForm onSave={handleCreate} onCancel={() => setEditingId(null)} />
            </div>
          )}

          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="mb-12">
                <SectionLabel>Предстоящие · {upcoming.length}</SectionLabel>
                <div className="mt-6">
                  {upcoming.length === 0 ? (
                    <p className="text-foreground/50 text-sm font-light py-6">Предстоящих мероприятий пока нет.</p>
                  ) : renderGrid(upcoming)}
                </div>
              </div>

              {past.length > 0 && (
                <div>
                  <SectionLabel>Прошедшие · {past.length}</SectionLabel>
                  <div className="mt-6 opacity-70">{renderGrid(past)}</div>
                </div>
              )}
            </>
          )}

          <div className="mt-16 pt-10 border-t border-border text-center">
            <p className="text-foreground/60 text-lg font-light">Хотите предложить своё мероприятие?</p>
            <Link to="/contact" className="mt-5 inline-block px-7 py-3.5 border border-foreground text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
              Связаться с командой
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}