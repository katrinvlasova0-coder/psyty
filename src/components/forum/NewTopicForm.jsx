import React, { useState } from 'react';

const CATEGORIES = ['Концепция PSYTY', 'Инфраструктура', 'Сообщество', 'Образование', 'Практика', 'Другое'];

export default function NewTopicForm({ onCreate, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Концепция PSYTY');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Заполните заголовок и текст темы.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await onCreate({ title: title.trim(), category, body: body.trim() });
    } catch (err) {
      setError(err.message || 'Не удалось создать тему.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="border border-border bg-background p-6 lg:p-8">
      <h3 className="font-display text-2xl">Новая тема</h3>
      <div className="mt-6 space-y-5">
        <div>
          <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Категория</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-[12px] border transition-colors ${category === c ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground/70 hover:border-foreground'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Заголовок</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={140}
            className="mt-2 w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground font-display text-xl"
            placeholder="О чём хотите обсудить?"
          />
        </div>
        <div>
          <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Текст</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="mt-2 w-full bg-transparent border border-border p-3 focus:outline-none focus:border-foreground text-[15px] leading-[1.7] resize-y"
            placeholder="Раскройте свою мысль о концепции PSYTY..."
          />
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={submitting} className="px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50">
          {submitting ? 'Создание...' : 'Опубликовать тему'}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-border text-[12px] tracking-[0.18em] uppercase hover:bg-secondary transition-colors">
          Отмена
        </button>
      </div>
    </form>
  );
}