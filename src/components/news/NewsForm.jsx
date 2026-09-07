import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const CATEGORIES = ['Строительство', 'Инфраструктура', 'Сообщество', 'Образование', 'Другое'];

export default function NewsForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [category, setCategory] = useState(initial?.category || 'Строительство');
  const [body, setBody] = useState(initial?.body || '');
  const [imageUrl, setImageUrl] = useState(initial?.image_url || '');
  const [status, setStatus] = useState(initial?.status || 'published');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setImageUrl(file_url);
    } catch (err) {
      setError('Не удалось загрузить изображение.');
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Заполните заголовок и текст.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave({
        title: title.trim(),
        category,
        body: body.trim(),
        image_url: imageUrl,
        status,
      });
    } catch (err) {
      setError(err.message || 'Не удалось сохранить.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="border border-border p-6 lg:p-8 bg-background space-y-6">
      <h3 className="font-display text-2xl">{initial ? 'Редактировать новость' : 'Новая новость'}</h3>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Заголовок</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={160}
          className="mt-2 w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground font-display text-xl"
          placeholder="Например: Завершён фундамент Дома практики"
        />
      </div>

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
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Изображение</label>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <label className="px-4 py-2 border border-border text-[12px] tracking-[0.15em] uppercase hover:bg-secondary transition-colors cursor-pointer">
            {uploading ? 'Загрузка...' : 'Загрузить'}
            <input type="file" accept="image/*" onChange={onUpload} className="hidden" disabled={uploading} />
          </label>
          {imageUrl && (
            <div className="flex items-center gap-3">
              <img src={imageUrl} alt="preview" className="w-20 h-20 object-cover border border-border" />
              <button type="button" onClick={() => setImageUrl('')} className="text-[12px] text-muted-foreground hover:text-foreground">Удалить</button>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Текст</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          className="mt-2 w-full bg-transparent border border-border p-3 focus:outline-none focus:border-foreground text-[15px] leading-[1.7] resize-y"
          placeholder="Опишите ход работ, этапы, сроки..."
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Статус</label>
        <button
          type="button"
          onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
          className={`px-3 py-1.5 text-[12px] border transition-colors ${status === 'published' ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground/70'}`}
        >
          {status === 'published' ? 'Опубликована' : 'Черновик'}
        </button>
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