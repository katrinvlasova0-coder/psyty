import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import SectionLabel from '@/components/psity/SectionLabel';
import ExpertCard from '@/components/experts/ExpertCard';
import ExpertForm from '@/components/experts/ExpertForm';

export default function ExpertsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null | 'new' | item.id

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await base44.entities.Expert.list('-created_date', 100);
      setItems(list || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (data) => {
    await base44.entities.Expert.create(data);
    setEditingId(null);
    await load();
  };

  const handleUpdate = async (data) => {
    await base44.entities.Expert.update(editingId, data);
    setEditingId(null);
    await load();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Удалить эксперта «${item.name}»?`)) return;
    await base44.entities.Expert.delete(item.id);
    await load();
  };

  return (
    <div className="pt-32 lg:pt-40 pb-28 min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel>Наши эксперты</SectionLabel>
        <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] text-balance max-w-3xl">
          Люди, развивающие PSYTY.
        </h1>
        <p className="mt-6 text-foreground/60 text-lg font-light max-w-2xl leading-[1.7]">
          Учёные, терапевты и предприниматели, формирующие концепцию, инфраструктуру и культуру сообщества. Каждый — со своими профессиональными интересами и вкладом.
        </p>

        {isAdmin && editingId !== 'new' && (
          <button
            onClick={() => setEditingId('new')}
            className="mt-8 px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity"
          >
            + Добавить эксперта
          </button>
        )}

        {editingId === 'new' && (
          <div className="mt-8">
            <ExpertForm onSave={handleCreate} onCancel={() => setEditingId(null)} />
          </div>
        )}

        <div className="mt-14">
          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <p className="py-16 text-foreground/50 text-sm font-light">Список экспертов скоро будет опубликован.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) =>
                editingId === item.id ? (
                  <ExpertForm key={item.id} initial={item} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
                ) : (
                  <ExpertCard key={item.id} item={item} isAdmin={isAdmin} onEdit={(it) => setEditingId(it.id)} onDelete={handleDelete} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}