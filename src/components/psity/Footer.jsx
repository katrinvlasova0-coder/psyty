import React from 'react';
import { Link } from 'react-router-dom';
import Mark from './Mark';

export default function Footer() {
  const year = new Date().getFullYear();
  const nav = [
    ['Среда', '/infrastructure'], ['Жить', '/live'], ['Учиться', '/study'],
    ['Работать', '/work'], ['Каталог', '/catalogue'], ['Сообщество', '/community'], ['Галерея', '/gallery'], ['Мероприятия', '/events'], ['Вопросы и ответы', '/faq'],
  ];
  return (
    <footer className="bg-foreground text-background py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Mark className="w-6 h-6 text-background" />
              <span className="font-display text-2xl tracking-[0.2em]">PSYTY</span>
            </Link>
            <p className="mt-6 text-background/50 text-sm font-light leading-[1.7] max-w-sm">
              Город психологии. Среда для людей, исследующих человека — жить, учиться и работать в одном месте.
            </p>
            <p className="mt-8 text-[11px] tracking-[0.25em] uppercase text-background/40">Живи среди тех, кто понимает.</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-background/40 mb-5">Навигация</p>
            <ul className="space-y-3 text-sm text-background/60">
              {nav.map(([l, h]) => (
                <li key={h}><Link to={h} className="hover:text-background transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-background/40 mb-5">Контакты</p>
            <Link to="/contact" className="text-background/70 hover:text-background transition-colors block">Получить презентацию</Link>
            <Link to="/contact" className="text-background/70 hover:text-background transition-colors block mt-3">Связаться с командой</Link>
            <Link to="/community" className="text-background/70 hover:text-background transition-colors block mt-3">Founding Residents</Link>
            <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-background/40">RU / EN</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col sm:flex-row justify-between gap-4 text-[11px] tracking-wider text-background/40">
          <span>© {year} PSYTY. Концептуальный проект.</span>
          <span>Privacy · Terms · Все визуализации — концептуальные</span>
        </div>
      </div>
    </footer>
  );
}