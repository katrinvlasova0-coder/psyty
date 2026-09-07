import React from 'react';
import PageHeader from '@/components/psity/PageHeader';
import Facility from '@/components/psity/Facility';
import CtaBand from '@/components/psity/CtaBand';
import SectionLabel from '@/components/psity/SectionLabel';
import { IMG } from '@/components/psity/assets';

export default function StudyPage() {
  return (
    <>
      <PageHeader label="Учиться" title="Никогда не переставайте учиться."
        lead="Академия, исследовательская лаборатория, библиотека и лаборатория снов — непрерывное образование и исследования в нескольких минутах от дома." />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionLabel>Непрерывное образование</SectionLabel>
          <p className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.25] text-balance">
            Учиться можно всю жизнь — без поездок, в окружении коллег и наставников. Каждую неделю в PSYTY что-то происходит.
          </p>
        </div>
      </section>

      <Facility id="academy" label="PSYTY Academy" title="Постоянный образовательный центр." reverse
        lead="Лекции, супервизии, воркшопы, интенсивы, конференции, ретриты и международные программы. Резиденты получают приоритетный доступ."
        items={['Лекции', 'Супервизии', 'Воркшопы', 'Трёхдневные интенсивы', 'Специализации', 'Конференции', 'Ретриты', 'Visiting Professors Program']}
        tagline="This Week at PSYTY" />

      <Facility id="lab" label="PSYTY Lab" title="Город как лаборатория." image={IMG.lab} dark
        lead="Круглосуточная междисциплинарная исследовательская среда, доступная квалифицированным резидентам и приглашённым исследователям."
        items={['EEG Lab', 'HRV / Психофизиология', 'Eye Tracking', 'Sleep Research', 'VR Psychology', 'Cognitive Research', 'Biofeedback', 'Group Dynamics']}
        tagline="Propose → Collaborate → Research → Publish" />

      <Facility id="library" label="PSYTY Library" title="Библиотека человеческой природы." image={IMG.library} reverse
        lead="Крупная физическая и цифровая библиотека: психология, философия, нейронаука, антропология, социология. Редкие издания и архивы. Читальные залы работают допоздна."
        items={['Psychology', 'Philosophy', 'Neuroscience', 'Anthropology', 'Sociology', 'Rare editions', '24/7 для резидентов']} />

      <Facility id="dream" label="Dream Lab" title="Лаборатория снов." dark reverse
        lead="Пространство, посвящённое сну, сновидениям, памяти, сознанию, воображению и креативности. Вечерние лекции, сонные семинары, исследования сна."
        items={['Sleep', 'Dreams', 'Memory', 'Consciousness', 'Imagination', 'Creativity']} />

      <CtaBand title="Хотите учиться в PSYTY?" to="/contact" label="Узнать о программах" />
    </>
  );
}