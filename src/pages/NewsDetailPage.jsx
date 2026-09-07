import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import SectionLabel from '@/components/psity/SectionLabel';
import NewsForm from '@/components/news/NewsForm';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    base44.entities.News.get(id)
      .then(setItem)
      .catch((e) => setError(e.message || 'Не удалось загрузить новость.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (data) => {
    await base44.entities.News.update(id, data);
    const updated = await base44.entities.News.get(id);
    setItem(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Удалить эту новость?')) return;
    await base44.entities.News.delete(id);
    navigate('/news');
  };

  if (loading) {
    return (
      <div className="pt-40 min-h-screen flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (editing && isAdmin) {
    return (
      <div className="pt-32 lg:pt-40 pb-28 min-h-screen bg-background">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <NewsForm initial={item} onSave={handleSave} onCancel={() => setEditing(false)} />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-40 min-h-screen text-center">
        <p className="text-foreground/60">{error || 'Новость не найдена.'}</p>
        <Link to="/news" className="mt-6 inline-block px-6 py-3 border border-border text-[12px] tracking-[0.18em] uppercase hover:bg-secondary transition-colors">← Все новости</Link>
      </div>
    );
  }

  return (
    <article className="pt-32 lg:pt-40 pb-28 min-h-screen bg-background">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <Link to="/news" className="text-[12px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors">← Все новости</Link>

        <div className="mt-6">
          <SectionLabel>{item.category}</SectionLabel>
          <h1 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-balance">{item.title}</h1>
          <p className="mt-4 text-[12px] text-muted-foreground tracking-wide">
            {new Date(item.created_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {item.image_url && (
          <div className="mt-10 aspect-[16/9] overflow-hidden border border-border">
            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="mt-10 text-foreground/75 text-[16px] leading-[1.8] whitespace-pre-wrap font-light">
          {item.body}
        </div>

        {isAdmin && (
          <div className="mt-12 pt-8 border-t border-border flex gap-3">
            <button onClick={() => setEditing(true)} className="px-6 py-3 border border-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
              Редактировать
            </button>
            <button onClick={handleDelete} className="px-6 py-3 border border-border text-[12px] tracking-[0.18em] uppercase hover:border-destructive hover:text-destructive transition-colors">
              Удалить
            </button>
          </div>
        )}
      </div>
    </article>
  );
}