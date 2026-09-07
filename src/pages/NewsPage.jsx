import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import SectionLabel from '@/components/psity/SectionLabel';
import NewsCard from '@/components/news/NewsCard';
import NewsForm from '@/components/news/NewsForm';

export default function NewsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await base44.entities.News.list('-created_date', 100);
      setItems(list || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (data) => {
    await base44.entities.News.create(data);
    setCreating(false);
    await load();
  };

  return (
    <div className="pt-32 lg:pt-40 pb-28 min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel>Новости и ход строительства</SectionLabel>
        <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] text-balance max-w-3xl">
          Прогресс PSYTY в реальном времени.
        </h1>
        <p className="mt-6 text-foreground/60 text-lg font-light max-w-2xl leading-[1.7]">
          Обновления о возведении инфраструктуры, ключевых этапах и сроках. Жители следят за тем, как формируется среда.
        </p>

        {isAdmin && !creating && (
          <button onClick={() => setCreating(true)} className="mt-8 px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
            + Опубликовать новость
          </button>
        )}
        {isAdmin && creating && (
          <div className="mt-8">
            <NewsForm onSave={handleSave} onCancel={() => setCreating(false)} />
          </div>
        )}

        <div className="mt-14">
          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <p className="py-16 text-foreground/50 text-sm font-light">Пока нет опубликованных новостей.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}