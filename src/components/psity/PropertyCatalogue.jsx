import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import SectionLabel from './SectionLabel';

const filters = ['Все', 'Участок', 'Дом', 'Таунхаус', 'Квартира', 'Резиденция'];

const availLabel = { AVAILABLE: 'Доступно', RESERVED: 'Забронировано', SOLD: 'Продано' };
const availColor = { AVAILABLE: 'text-accent', RESERVED: 'text-terracotta', SOLD: 'text-muted-foreground' };

export default function PropertyCatalogue() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('Все');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Property.list('-created_date', 50)
      .then((d) => setItems(d))
      .finally(() => setLoading(false));
  }, []);

  const navigate = useNavigate();
  const shown = filter === 'Все' ? items : items.filter((p) => p.type === filter);

  return (
    <section className="py-32 lg:py-44 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionLabel>Каталог недвижимости</SectionLabel>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] max-w-3xl">
          Найдите свой дом в PSYTY.
        </h2>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-[12px] tracking-wider uppercase border transition-colors ${filter === f ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground/60 hover:border-foreground'}`}>{f}</button>
          ))}
        </div>

        {loading ? (
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <div key={i} className="aspect-[4/3] bg-secondary animate-pulse" />)}
          </div>
        ) : shown.length === 0 ? (
          <div className="mt-20 text-center py-20 border border-dashed border-border">
            <p className="font-display text-3xl text-muted-foreground">Каталог формируется</p>
            <p className="mt-3 text-foreground/50 text-sm">Первые объекты появятся на этапе Founding Residents.</p>
            <button onClick={() => navigate('/contact')} className="mt-8 px-7 py-3.5 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase">Узнать о первых объектах</button>
          </div>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((p) => (
              <div key={p.id} className="group border border-border bg-card hover:border-foreground transition-colors flex flex-col">
                <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
                  {p.render_url ? <img src={p.render_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center"><span className="text-[11px] tracking-[0.3em] uppercase text-foreground/20">{p.collection}</span></div>}
                  <span className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 glass ${availColor[p.availability] || ''}`}>{availLabel[p.availability] || ''}</span>
                  <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase px-2 py-1 glass text-foreground/70">{p.collection}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-foreground/50 font-light">
                    {p.area && <span>{p.area} м²</span>}
                    {p.land_area && <span>· {p.land_area} сот.</span>}
                    {p.bedrooms != null && <span>· {p.bedrooms} спальни</span>}
                    {p.bathrooms != null && <span>· {p.bathrooms} с/у</span>}
                    {p.study && <span>· кабинет</span>}
                    {p.terrace && <span>· терраса</span>}
                  </div>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <span className="font-display text-lg">{p.price_on_request ? 'Цена по запросу' : p.price ? `${p.price.toLocaleString('ru-RU')} ₽` : '—'}</span>
                    <button onClick={() => navigate('/contact')} className="text-[11px] tracking-[0.18em] uppercase text-accent hover:text-foreground">Узнать →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <button onClick={() => navigate('/contact')} className="px-7 py-3.5 border border-foreground text-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">Получить планировки</button>
          <button onClick={() => navigate('/contact')} className="px-7 py-3.5 border border-border text-foreground/70 text-[12px] tracking-[0.18em] uppercase hover:border-foreground transition-colors">Узнать стоимость</button>
          <button onClick={() => navigate('/contact')} className="px-7 py-3.5 border border-border text-foreground/70 text-[12px] tracking-[0.18em] uppercase hover:border-foreground transition-colors">Забронировать</button>
        </div>
      </div>
    </section>
  );
}