import React, { useState } from 'react';
import SectionLabel from './SectionLabel';
import Mark from './Mark';
import { submitLead } from '@/lib/submitLead';
import { isValidEmail } from '@/lib/formValidation';

const contents = ['Masterplan', 'Архитектура', 'Инфраструктура', 'Коллекции домов', 'Этапы развития', 'Founding Residents', 'Форматы недвижимости', 'Предварительные условия'];

export default function PresentationDownload() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!isValidEmail(email)) {
      setError('Укажите корректный email.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await submitLead({
        name: 'PSYTY Book request',
        email,
        phone,
        source: 'psyty-book',
        message: 'Запрос закрытой презентации PSYTY Book',
        extra: {
          interest: 'Founding Resident',
          form: 'presentation',
        },
      });
      setDone(true);
    } catch {
      setError('Не удалось отправить. Попробуйте ещё раз.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="py-32 lg:py-44 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel>PSYTY Book</SectionLabel>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05]">Получите закрытую презентацию проекта.</h2>
          <p className="mt-6 text-foreground/60 text-lg font-light leading-[1.7]">Содержание презентации:</p>
          <ul className="mt-6 space-y-2">
            {contents.map((c) => (
              <li key={c} className="flex items-center gap-3 text-foreground/70"><span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" /><span className="font-light">{c}</span></li>
            ))}
          </ul>
        </div>
        <div className="border border-border p-10 bg-card">
          {done ? (
            <div className="text-center py-10">
              <Mark className="w-10 h-10 text-accent mx-auto" />
              <p className="mt-6 font-display text-2xl">Запрос получен.</p>
              <p className="mt-3 text-foreground/60 text-sm">Мы пришлём PSYTY Book на указанные контакты.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">Получить PSYTY Book</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-transparent border-b border-border py-3.5 text-lg focus:outline-none focus:border-foreground" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон / мессенджер" className="w-full bg-transparent border-b border-border py-3.5 text-lg focus:outline-none focus:border-foreground" />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button onClick={submit} disabled={!email || busy} className="w-full mt-2 py-4 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase disabled:opacity-30 hover:bg-accent hover:text-background transition-colors">
                {busy ? 'Отправляем…' : 'Получить PSYTY Book'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
