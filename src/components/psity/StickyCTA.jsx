import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/lib/LangContext';

export default function StickyCTA() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700 && window.scrollY < document.body.scrollHeight - 1400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => navigate('/contact')} className="sm:hidden fixed bottom-5 inset-x-5 z-40 py-4 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase glass border border-border">
      {t('ctaContact')}
    </button>
  );
}