import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function ProfileForm({ user, onSaved }) {
  const get = (f) => user?.[f] ?? user?.data?.[f] ?? '';
  const [sphere, setSphere] = useState(get('sphere_of_interest'));
  const [skills, setSkills] = useState(get('professional_skills'));
  const [expectations, setExpectations] = useState(get('community_expectations'));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await base44.auth.updateMe({
        sphere_of_interest: sphere.trim(),
        professional_skills: skills.trim(),
        community_expectations: expectations.trim(),
      });
      setSaved(true);
      onSaved?.();
    } catch (err) {
      setError(err.message || 'Не удалось сохранить профиль.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="border border-border p-6 lg:p-8 bg-background space-y-6">
      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Сфера интересов</label>
        <input
          value={sphere}
          onChange={(e) => setSphere(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground font-display text-xl"
          placeholder="Психология, образование, архитектура, исследования..."
        />
      </div>
      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Профессиональные навыки</label>
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          rows={3}
          className="mt-2 w-full bg-transparent border border-border p-3 focus:outline-none focus:border-foreground text-[15px] leading-[1.7] resize-y"
          placeholder="Опишите ваш опыт и компетенции — чем вы могли бы делиться с сообществом."
        />
      </div>
      <div>
        <label className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Ожидания от сообщества PSYTY</label>
        <textarea
          value={expectations}
          onChange={(e) => setExpectations(e.target.value)}
          rows={4}
          className="mt-2 w-full bg-transparent border border-border p-3 focus:outline-none focus:border-foreground text-[15px] leading-[1.7] resize-y"
          placeholder="Что вы надеетесь найти и создать вместе с другими резидентами?"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {saved && <p className="text-sm text-accent">Профиль сохранён.</p>}

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saving ? 'Сохранение...' : 'Сохранить профиль'}
      </button>
    </form>
  );
}