import React, { useState } from 'react';
import { Check } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { submitLead } from '@/lib/submitLead';
import { isValidEmail } from '@/lib/formValidation';

const interests = ['Участок', 'Дом', 'Таунхаус', 'Квартира', 'Инвестиция', 'Founding Resident', 'Профессиональное участие'];
const usages = ['Постоянное проживание', 'Второй дом', 'Профессиональная практика', 'Инвестиция', 'Пока изучаю проект'];
const budgets = ['до 15 млн ₽', '15–30 млн ₽', '30–60 млн ₽', '60–100 млн ₽', '100+ млн ₽', 'Ещё не определился'];

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ interest: '', usage: '', budget_range: '', property_size: '', professional_background: '', is_psychologist: false, name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const total = 6;

  const submit = async () => {
    if (!data.name.trim() || !isValidEmail(data.email)) {
      setError('Укажите имя и корректный email.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: 'psyty-lead-form',
        message: [
          `interest: ${data.interest}`,
          `usage: ${data.usage}`,
          `budget: ${data.budget_range}`,
          `size: ${data.property_size}`,
          `background: ${data.professional_background}`,
          data.is_psychologist ? 'psychologist: yes' : '',
        ]
          .filter(Boolean)
          .join(' | '),
        extra: {
          interest: data.interest,
          usage: data.usage,
          budget_range: data.budget_range,
          property_size: data.property_size,
          professional_background: data.professional_background,
          is_psychologist: data.is_psychologist ? 'yes' : 'no',
          form: 'lead',
        },
      });
      setDone(true);
    } catch {
      setError('Не удалось отправить. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section id="lead" className="py-32 lg:py-44 bg-foreground text-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full border border-background/30 flex items-center justify-center"><Check className="text-background" /></div>
          <h2 className="mt-8 font-display text-4xl">Спасибо.</h2>
          <p className="mt-4 text-background/60 text-lg font-light leading-[1.7]">
            Мы получили ваш запрос и свяжемся с вами, чтобы предложить персональное место в PSYTY.
          </p>
          <p className="mt-8 text-[11px] tracking-[0.25em] uppercase text-background/40">Your environment shapes you. Choose it consciously.</p>
        </div>
      </section>
    );
  }

  const steps = [
    { title: 'Что вас интересует?', sub: 'Шаг 1 из 6', opts: interests, key: 'interest' },
    { title: 'Как планируете использовать недвижимость?', sub: 'Шаг 2 из 6', opts: usages, key: 'usage' },
    { title: 'В каком бюджете вы рассматриваете?', sub: 'Шаг 3 из 6', opts: budgets, key: 'budget_range' },
    { title: 'Желаемый размер недвижимости?', sub: 'Шаг 4 из 6', input: true, key: 'property_size', ph: 'Например: дом 180 м² на участке 8 соток' },
    { title: 'Ваш профессиональный фон?', sub: 'Шаг 5 из 6', input: true, key: 'professional_background', ph: 'Область, специализация, опыт', extra: true },
    { title: 'Как с вами связаться?', sub: 'Шаг 6 из 6', contact: true },
  ];
  const s = steps[step];

  return (
    <section id="lead" className="py-32 lg:py-44 bg-foreground text-background">
      <div className="max-w-2xl mx-auto px-6">
        <SectionLabel dark>Найдите своё место в PSYTY</SectionLabel>
        <div className="flex gap-1.5 mb-10">
          {Array.from({ length: total }).map((_, i) => <div key={i} className={`h-px flex-1 ${i <= step ? 'bg-background' : 'bg-background/20'}`} />)}
        </div>

        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.1]">{s.title}</h2>
        <p className="mt-3 text-[11px] tracking-[0.25em] uppercase text-background/40">{s.sub}</p>

        <div className="mt-10">
          {s.opts && (
            <div className="grid sm:grid-cols-2 gap-3">
              {s.opts.map((o) => (
                <button key={o} onClick={() => { set(s.key, o); setStep(step + 1); }} className={`text-left px-5 py-4 border transition-colors ${data[s.key] === o ? 'border-background bg-background/10' : 'border-background/20 hover:border-background/50'}`}>
                  <span className="font-display text-xl">{o}</span>
                </button>
              ))}
            </div>
          )}
          {s.input && (
            <div>
              <input value={data[s.key]} onChange={(e) => set(s.key, e.target.value)} placeholder={s.ph} className="w-full bg-transparent border-b border-background/30 py-4 text-xl font-display focus:outline-none focus:border-background placeholder:text-background/30" />
              {s.extra && (
                <label className="mt-6 flex items-center gap-3 text-background/70 text-sm cursor-pointer">
                  <input type="checkbox" checked={data.is_psychologist} onChange={(e) => set('is_psychologist', e.target.checked)} className="accent-background w-4 h-4" />
                  Я психолог / психотерапевт / специалист смежной области
                </label>
              )}
              <button onClick={() => setStep(step + 1)} disabled={!data[s.key]} className="mt-8 px-8 py-3.5 bg-background text-foreground text-[12px] tracking-[0.18em] uppercase disabled:opacity-30">Далее</button>
            </div>
          )}
          {s.contact && (
            <div className="space-y-5">
              <input value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="Имя" className="w-full bg-transparent border-b border-background/30 py-3.5 text-lg focus:outline-none focus:border-background placeholder:text-background/30" />
              <input value={data.email} onChange={(e) => set('email', e.target.value)} placeholder="Email" className="w-full bg-transparent border-b border-background/30 py-3.5 text-lg focus:outline-none focus:border-background placeholder:text-background/30" />
              <input value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Телефон / мессенджер" className="w-full bg-transparent border-b border-background/30 py-3.5 text-lg focus:outline-none focus:border-background placeholder:text-background/30" />
              {error && <p className="text-sm text-red-300">{error}</p>}
              <button onClick={submit} disabled={!data.name || !data.email || submitting} className="mt-4 px-8 py-4 bg-background text-foreground text-[12px] tracking-[0.18em] uppercase disabled:opacity-30 hover:bg-accent hover:text-background transition-colors">
                {submitting ? 'Отправляем…' : 'Получить персональное предложение'}
              </button>
            </div>
          )}
        </div>

        {step > 0 && !s.contact && (
          <button onClick={() => setStep(step - 1)} className="mt-10 text-[12px] tracking-wider text-background/40 hover:text-background">← Назад</button>
        )}
      </div>
    </section>
  );
}
