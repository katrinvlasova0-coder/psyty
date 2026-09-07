import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import Mark from './Mark';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { label: t('navEnvironment'), to: '/infrastructure' },
    { label: t('navLive'), to: '/live' },
    { label: t('navStudy'), to: '/study' },
    { label: t('navWork'), to: '/work' },
    { label: t('navCatalogue'), to: '/catalogue' },
    { label: t('navCommunity'), to: '/community' },
    { label: 'Новости', to: '/news' },
  ];

  const solid = scrolled || open;
  const txt = solid ? 'text-foreground' : 'text-white';

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${solid ? 'glass border-b border-border/60' : 'bg-transparent'}`}>
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className={`flex items-center gap-2.5 group ${txt}`}>
            <Mark className="w-6 h-6" />
            <span className="font-display text-2xl tracking-[0.2em]">PSYTY</span>
          </Link>
          <div className={`hidden lg:flex items-center gap-7 text-[13px] tracking-wide ${solid ? 'text-foreground/70' : 'text-white/70'}`}>
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`hover:opacity-100 transition-colors ${location.pathname === l.to ? (solid ? 'text-foreground' : 'text-white') : ''}`}>{l.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className={`hidden sm:flex items-center gap-1.5 text-[12px] tracking-widest ${solid ? 'text-foreground/50' : 'text-white/50'}`}>
              <button onClick={() => setLang('ru')} className={lang === 'ru' ? (solid ? 'text-foreground' : 'text-white') : ''}>RU</button>
              <span>/</span>
              <button onClick={() => setLang('en')} className={lang === 'en' ? (solid ? 'text-foreground' : 'text-white') : ''}>EN</button>
            </div>
            <Link to="/contact" className="hidden sm:inline-flex items-center px-5 py-2.5 bg-foreground text-background text-[12px] tracking-[0.15em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
              {t('ctaContact')}
            </Link>
            <button className={`lg:hidden p-1 ${txt}`} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 glass lg:hidden flex flex-col pt-24 px-8 gap-1 overflow-y-auto">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="font-display text-3xl py-3 border-b border-border/40">{l.label}</Link>
          ))}
          <Link to="/contact" className="mt-6 py-4 bg-foreground text-background text-sm tracking-[0.15em] uppercase text-center">{t('ctaContact')}</Link>
        </div>
      )}
    </>
  );
}