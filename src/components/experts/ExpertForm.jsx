import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const TYPES = ['Учёный', 'Терапевт', 'Предприниматель'];

export default function ExpertForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || 'Учёный');
  const [position, setPosition] = useState(initial?.position || '');
  const [bio, setBio] = useState(initial?.bio || '');
  const [interests, setInterests] = useState(initial?.interests || '');
  const [photoUrl, setPhotoUrl] = useState(initial?.photo_url || '');
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
      setPhotoUrl(file_url);
    } catch (err) {
      setError('Не удалось загрузить фото.');
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Укажите имя.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave({
        name: name.trim(),
        type,
        position: position.trim(),
        bio: bio.trim(),
        interests: interests.trim(),
        photo_url: photoUrl,
      });
    } catch (err) {
      setError(err.message || 'Не удалось сохранить.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="border border-border p-6 lg:p-8 bg-background space-y-6">
      <h3 className="font-display text-2xl">{initial ? 'Редактировать эксперта' : 'Новый эксперт'}</h3>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Имя</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground font-display text-xl"
          placeholder="Имя и фамилия"
        />
      </div>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Роль</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-3 py-1.5 text-[12px] border transition-colors ${type === t ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground/70 hover:border-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Должность / регалия</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground text-[15px]"
          placeholder="Например: к. психол. н., психотерапевт"
        />
      </div>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Фото</label>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <label className="px-4 py-2 border border-border text-[12px] tracking-[0.15em] uppercase hover:bg-secondary transition-colors cursor-pointer">
            {uploading ? 'Загрузка...' : 'Загрузить'}
            <input type="file" accept="image/*" onChange={onUpload} className="hidden" disabled={uploading} />
          </label>
          {photoUrl && (
            <div className="flex items-center gap-3">
              <img src={photoUrl} alt="preview" className="w-20 h-24 object-cover border border-border" />
              <button type="button" onClick={() => setPhotoUrl('')} className="text-[12px] text-muted-foreground hover:text-foreground">Удалить</button>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Биография</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="mt-2 w-full bg-transparent border border-border p-3 focus:outline-none focus:border-foreground text-[15px] leading-[1.7] resize-y"
          placeholder="Кратко о пути и вкладе в проект..."
        />
      </div>

      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Профессиональные интересы</label>
        <textarea
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          rows={3}
          className="mt-2 w-full bg-transparent border border-border p-3 focus:outline-none focus:border-foreground text-[15px] leading-[1.7] resize-y"
          placeholder="Сферы исследований, методы, направления..."
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