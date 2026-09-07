import React, { useState } from 'react';

const CATEGORIES = ['Условия проживания', 'Инвестиции', 'Принципы сообщества', 'Другое'];

export default function FAQForm({ initial, onSave, onCancel }) {
  const [question, setQuestion] = useState(initial?.question || '');
  const [answer, setAnswer] = useState(initial?.answer || '');
  const [category, setCategory] = useState(initial?.category || 'Условия проживания');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      setError('Заполните вопрос и ответ.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave({ question: question.trim(), answer: answer.trim(), category });
    } catch (err) {
      setError(err.message || 'Не удалось сохранить.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="border border-border p-6 lg:p-8 bg-background space-y-6 mb-6">
      <h3 className="font-display text-2xl">{initial ? 'Редактировать вопрос' : 'Новый вопрос'}</h3>

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
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Вопрос</label>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground font-display text-xl"
          placeholder="Например: Какие условия покупки участка?"
        />
      </div>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Ответ</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          className="mt-2 w-full bg-transparent border border-border p-3 focus:outline-none focus:border-foreground text-[15px] leading-[1.7] resize-y"
          placeholder="Чёткий и краткий ответ для новых резидентов..."
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50">
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-border text-[12px] tracking-[0.18em] uppercase hover:bg-secondary transition-colors">
          Отмена
        </button>
      </div>
    </form>
  );
}