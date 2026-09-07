import React from 'react';
import PageHeader from '@/components/psity/PageHeader';
import Facility from '@/components/psity/Facility';
import CtaBand from '@/components/psity/CtaBand';
import SectionLabel from '@/components/psity/SectionLabel';
import { IMG } from '@/components/psity/assets';

export default function LivePage() {
  return (
    <>
      <PageHeader label="Жить" title="Жизнь как часть среды."
        lead="Жить в PSYTY — значит каждое утро просыпаться в окружении, созданном для осознанной жизни: ферма, библиотека, лес, тишина, wellness и места случайных встреч с людьми, которые вас понимают." />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionLabel>Повседневность</SectionLabel>
          <p className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.25] text-balance">
            Среда, в которой не нужно уезжать, чтобы учиться, работать, отдыхать или расти. Всё здесь.
          </p>
        </div>
      </section>

      <Facility id="farm" label="PSYTY Farm" title="С фермы — на ваш стол." image={IMG.farm} reverse
        lead="Красивая регенеративная ферма. Резиденты участвуют добровольно. Еженедельно — PSYTY Farm Market."
        items={['Овощи', 'Травы', 'Ягоды', 'Сад', 'Теплица', 'Пекарня', 'Фермерский магазин', 'Сезонный ресторан']} />

      <Facility id="square" label="Central Square" title="Площадь как точка сборки." image={IMG.square} dark
        lead="Пешеходная центральная площадь — сердце общественной жизни PSYTY. Место встреч, событий, рынков и неспешных разговоров."
        tagline="Центр общественной среды проекта" />

      <Facility id="health" label="Health & Recovery" title="Разум и тело — одна система." reverse
        lead="Изысканный wellness-кампус. Любые услуги здоровья представлены с учётом применимого профессионального лицензирования и медицинских стандартов."
        items={['Бассейн', 'Gym', 'Йога', 'Pilates', 'Сауна', 'Массаж', 'Медитация', 'Сон', 'Стресс-менеджмент']} />

      <Facility id="walking" label="Walking Therapy Network" title="Сеть лесных маршрутов для разговоров и тишины." image={IMG.walk}
        lead="Уникальная черта PSYTY: маршруты для рефлексии, walking-бесед, медитации, творческого мышления и тихих прогулок."
        items={['15 минут', '30 минут', '60 минут', '90 минут', 'Маршруты без пересечений с публикой']} />

      <Facility id="silent" label="Silent House" title="Дом тишины." image={IMG.silent} reverse dark
        lead="Минималистичное здание, скрытое в лесу. Без телефонов, встреч, разговоров, уведомлений. Только тишина, чтение, размышление, медитация, письмо."
        tagline="Одна из фирменных опытов PSYTY" />

      <Facility id="children" label="Дети" title="Другая среда с самого начала." dark
        lead="PSYTY Kindergarten и PSYTY School. Тёплая, природная, творческая архитектура. Эмоциональный интеллект, коммуникация, креативность, природа, критическое мышление, самосознание."
        tagline="Психология — как эмоциональная грамотность" />

      <CtaBand title="Хотите жить в такой среде?" to="/contact" label="Узнать о резидентстве" />
    </>
  );
}