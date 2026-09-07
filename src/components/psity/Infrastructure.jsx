import React from 'react';
import Facility from './Facility';
import { IMG } from './assets';

const labItems = ['EEG Lab', 'HRV / Психофизиология', 'Eye Tracking', 'Sleep Research', 'VR Psychology', 'Cognitive Research', 'Biofeedback', 'Group Dynamics', 'Developmental Psychology', 'Psychosomatic Research'];

export default function Infrastructure() {
  return (
    <>
      <Facility id="lab" label="PSYTY Lab" title="Город как лаборатория." image={IMG.lab} dark
        lead="PSYTY Lab — круглосуточная междисциплинарная исследовательская среда, доступная квалифицированным резидентам и приглашённым исследователям."
        items={labItems}
        tagline="Propose → Collaborate → Research → Publish · Участие добровольное, этичное, с информированного согласия" />

      <Facility id="academy" label="PSYTY Academy" title="Никогда не переставайте учиться." reverse
        lead="Постоянный профессиональный образовательный центр. Каждую неделю что-то происходит: лекции, супервизии, воркшопы, интенсивы, конференции, ретриты, международные программы."
        items={['Лекции', 'Супервизии', 'Воркшопы', 'Трёхдневные интенсивы', 'Специализации', 'Конференции', 'Ретриты', 'Visiting Professors Program']}
        tagline="This Week at PSYTY · Резиденты получают приоритетный доступ" />

      <Facility id="practice" label="Practice House" title="Практика, не покидая свой город." dark
        lead="Профессиональный центр: терапевтические комнаты, групповые, супервизорские, семейные, детские, онлайн-студии, записи, семинарные."
        items={['Therapy rooms', 'Group rooms', 'Supervision', 'Family therapy', 'Child psychology', 'Online studios', 'Recording studios', 'Seminar rooms']}
        tagline="Резиденты бронируют пространства через приложение PSYTY · Дом отдельно — практика отдельно" />

      <Facility id="health" label="Health & Recovery" title="Разум и тело — одна система." reverse
        lead="Изысканный wellness-кампус. Любые услуги здоровья представлены с учётом применимого профессионального лицензирования и медицинских стандартов."
        items={['Бассейн', 'Gym', 'Йога', 'Pilates', 'Сауна', 'Массаж', 'Физиотерапия', 'Медитация', 'Biofeedback', 'Сон', 'Стресс-менеджмент', 'Реабилитация']} />

      <Facility id="walking" label="Walking Therapy Network" title="Сеть лесных маршрутов для разговоров и тишины." image={IMG.walk}
        lead="Уникальная черта PSYTY: маршруты для рефлексии, walking-бесед, медитации, творческого мышления и тихих прогулок."
        items={['15 минут', '30 минут', '60 минут', '90 минут', 'Маршруты без пересечений с публикой']}
        tagline="Психологи гуляют с людьми через красивые лесные ландшафты" />

      <Facility id="silent" label="Silent House" title="Дом тишины." image={IMG.silent} dark
        lead="Минималистичное здание, скрытое в лесу. Без телефонов, встреч, разговоров, уведомлений. Только тишина, чтение, размышление, медитация, письмо."
        tagline="Резиденты бронируют несколько часов или целый день · Одна из фирменных опытов PSYTY" />

      <Facility id="dream" label="Dream Lab" title="Лаборатория снов." reverse dark
        lead="Пространство, посвящённое сну, сновидениям, памяти, сознанию, воображению и креативности. Исследования и культурная программа: вечерние лекции, сонные семинары, исследования сна."
        items={['Sleep', 'Dreams', 'Memory', 'Consciousness', 'Imagination', 'Creativity']} />

      <Facility id="children" label="Дети" title="Другая среда с самого начала."
        lead="PSYTY Kindergarten и PSYTY School. Тёплая, природная, творческая архитектура. Сильный академический фундамент, эмоциональный интеллект, коммуникация, разрешение конфликтов, психология, креативность, природа, критическое мышление, самосознание."
        tagline="Психология — как эмоциональная грамотность, а не эксперимент над детьми" />

      <Facility id="farm" label="PSYTY Farm" title="С фермы — на ваш стол." image={IMG.farm} reverse
        lead="Красивая регенеративная ферма. Резиденты участвуют добровольно. Еженедельно — PSYTY Farm Market."
        items={['Овощи', 'Травы', 'Ягоды', 'Сад', 'Теплица', 'Пекарня', 'Фермерский магазин', 'Сезонный ресторан']}
        tagline="Концептуальное вдохновение Esalen — без аффилиации" />

      <Facility id="hotel" label="Hotel · Bakery · Restaurant" title="Места случайных встреч." dark
        lead="Бутик-отель для приглашённых лекторов, участников конференций, гостей резидентов. На первом этаже — PSYTY Bakery: утренний кофе, свежий хлеб, встречи перед лекциями."
        items={['Hotel', 'Restaurant', 'Bakery', 'Coffee shop', 'Bookstore', 'Gallery', 'Lecture hall', 'Amphitheatre']} />

      <Facility id="square" label="Central Square" title="Площадь как точка сборки." image={IMG.square}
        lead="Пешеходная центральная площадь — сердце общественной жизни PSYTY. Место встреч, событий, рынков и неспешных разговоров."
        tagline="Центр общественной среды проекта" />

      <Facility id="library" label="PSYTY Library" title="Библиотека человеческой природы." image={IMG.library} reverse
        lead="Крупная физическая и цифровая библиотека: психология, психиатрия, философия, нейронаука, антропология, образование, социология, поведение. Редкие издания и архивы. Читальные залы работают допоздна."
        items={['Psychology', 'Psychiatry', 'Philosophy', 'Neuroscience', 'Anthropology', 'Sociology', 'Rare editions', '24/7 для резидентов']} />
    </>
  );
}