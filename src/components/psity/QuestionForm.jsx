import React, { useState } from 'react';
import { Check } from 'lucide-react';
import SectionLabel from '@/components/psity/SectionLabel';
import { submitLead } from '@/lib/submitLead';
import { isValidEmail } from '@/lib/formValidation';

export default function QuestionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !isValidEmail(email) || !question.trim()) {
      setError('Заполните имя, корректный email и вопрос.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await submitLead({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        source: 'psyty-question-form',
        message: question.trim(),
        extra: { form: 'question' },
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
      <section className="py-28 lg:py-36 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-full border border-border flex items-center justify-center">
            <Check className="text-foreground" />
          </div>
          <h2 className="mt-6 font-display text-3xl">Вопрос отправлен.</h2>
          <p className="mt-3 text-foreground/60 text-lg font-light leading-[1.7]">
            Спасибо! Администрация PSYTY получит ваш вопрос и ответит напрямую.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 lg:py-36 bg-background border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <SectionLabel>Задать вопрос</SectionLabel>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.1]">Есть вопрос? Напишите администрации.</h2>
        <p className="mt-4 text-foreground/60 text-lg font-light leading-[1.7]">
          Заполните форму — мы получим ваш вопрос и ответим вам напрямую.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground placeholder:text-foreground/30"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground placeholder:text-foreground/30"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Телефон / мессенджер (необязательно)"
            className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground placeholder:text-foreground/30"
          />
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            placeholder="Ваш вопрос"
            className="w-full bg-transparent border border-border p-3 text-[15px] leading-[1.7] focus:outline-none focus:border-foreground placeholder:text-foreground/30 resize-y"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3.5 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? 'Отправляем…' : 'Отправить вопрос'}
          </button>
        </form>
      </div>
    </section>
  );
}
