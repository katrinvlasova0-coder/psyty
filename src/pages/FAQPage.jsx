import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import PageHeader from '@/components/psity/PageHeader';
import SectionLabel from '@/components/psity/SectionLabel';
import FAQItem from '@/components/faq/FAQItem';
import FAQForm from '@/components/faq/FAQForm';

const CATEGORIES = ['Условия проживания', 'Инвестиции', 'Принципы сообщества', 'Другое'];

export default function FAQPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null | 'new' | item.id

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await base44.entities.FAQ.list('-created_date', 200);
      setItems(list || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (data) => {
    await base44.entities.FAQ.create(data);
    setEditingId(null);
    await load();
  };

  const handleUpdate = async (data) => {
    await base44.entities.FAQ.update(editingId, data);
    setEditingId(null);
    await load();
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Удалить этот вопрос?')) return;
    await base44.entities.FAQ.delete(item.id);
    await load();
  };

  const grouped = CATEGORIES.map((c) => ({ category: c, list: items.filter((i) => i.category === c) }));

  return (
    <>
      <PageHeader
        label="Вопросы и ответы"
        title="Часто задаваемые вопросы."
        lead="Коротко об условиях проживания, инвестициях и принципах сообщества PSYTY. Не нашли ответ — напишите администрации."
      />

      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          {isAdmin && editingId !== 'new' && (
            <button
              onClick={() => setEditingId('new')}
              className="mb-10 px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity"
            >
              + Добавить вопрос
            </button>
          )}
          {editingId === 'new' && (
            <FAQForm onSave={handleCreate} onCancel={() => setEditingId(null)} />
          )}

          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
            </div>
          ) : (
            grouped.map(({ category, list }) => (
              <div key={category} className="mb-14 last:mb-0">
                <SectionLabel>{category}</SectionLabel>
                <div className="mt-4">
                  {list.length === 0 ? (
                    <p className="text-foreground/40 text-sm font-light py-4">Пока нет вопросов в этой категории.</p>
                  ) : (
                    list.map((item) =>
                      editingId === item.id ? (
                        <FAQForm key={item.id} initial={item} onSave={handleUpdate} onCancel={() => setEditingId(null)} />
                      ) : (
                        <FAQItem key={item.id} item={item} isAdmin={isAdmin} onEdit={(it) => setEditingId(it.id)} onDelete={handleDelete} />
                      )
                    )
                  )}
                </div>
              </div>
            ))
          )}

          <div className="mt-16 pt-10 border-t border-border text-center">
            <p className="text-foreground/60 text-lg font-light">Не нашли ответ на свой вопрос?</p>
            <Link to="/contact" className="mt-5 inline-block px-7 py-3.5 border border-foreground text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
              Напишите администрации
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}