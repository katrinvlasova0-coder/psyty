import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import PageHeader from '@/components/psity/PageHeader';
import GalleryItem from '@/components/gallery/GalleryItem';
import GalleryForm from '@/components/gallery/GalleryForm';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['Все', 'Инфраструктура', 'Жильё', 'Природа и среда', 'Ход строительства'];

export default function GalleryPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('Все');
  const [editingId, setEditingId] = useState(null); // null | 'new' | item.id
  const [lightbox, setLightbox] = useState(null); // index into filtered

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await base44.entities.Gallery.list('-created_date', 200);
      setItems(list || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = active === 'Все' ? items : items.filter((i) => i.category === active);

  const handleCreate = async (data) => {
    await base44.entities.Gallery.create(data);
    setEditingId(null);
    await load();
  };

  const handleUpdate = async (data) => {
    await base44.entities.Gallery.update(editingId, data);
    setEditingId(null);
    await load();
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Удалить это фото?')) return;
    await base44.entities.Gallery.delete(item.id);
    await load();
  };

  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i > 0 ? i - 1 : filtered.length - 1));
  const next = () => setLightbox((i) => (i < filtered.length - 1 ? i + 1 : 0));

  return (
    <>
      <PageHeader
        label="Галерея"
        title="Среда PSYTY в деталях."
        lead="Фотографии и визуализации объектов инфраструктуры — от концепции до хода строительства. Атмосфера, в которой формируется сообщество."
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
              + Добавить фото
            </button>
          )}
          {editingId === 'new' && (
            <div className="mb-10">
              <GalleryForm onSave={handleCreate} onCancel={() => setEditingId(null)} />
            </div>
          )}

          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-16 text-foreground/50 text-sm font-light">В этой категории пока нет изображений.</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
              {filtered.map((item, idx) =>
                editingId === item.id ? (
                  <div key={item.id} className="break-inside-avoid mb-5">
                    <GalleryForm initial={item} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
                  </div>
                ) : (
                  <div key={item.id} className="break-inside-avoid mb-5">
                    <GalleryItem
                      item={item}
                      idx={idx}
                      onOpen={(i) => setLightbox(i)}
                      isAdmin={isAdmin}
                      onEdit={(it) => setEditingId(it.id)}
                      onDelete={handleDelete}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-5 right-5 text-background/70 hover:text-background" onClick={closeLightbox} aria-label="Закрыть">
            <X className="w-7 h-7" />
          </button>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 text-background/70 hover:text-background p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Предыдущее"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-background/70 hover:text-background p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Следующее"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[88vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].image_url}
              alt={filtered[lightbox].title}
              className="max-h-[76vh] max-w-full object-contain"
            />
            <div className="mt-4 text-center">
              <p className="font-display text-xl text-background">{filtered[lightbox].title}</p>
              {filtered[lightbox].caption && (
                <p className="mt-1 text-background/60 text-sm font-light max-w-xl mx-auto">{filtered[lightbox].caption}</p>
              )}
              <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-background/40">{filtered[lightbox].category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}