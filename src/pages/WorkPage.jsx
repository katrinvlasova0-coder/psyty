import React from 'react';
import PageHeader from '@/components/psity/PageHeader';
import Facility from '@/components/psity/Facility';
import CtaBand from '@/components/psity/CtaBand';
import SectionLabel from '@/components/psity/SectionLabel';
import { IMG } from '@/components/psity/assets';

export default function WorkPage() {
  return (
    <>
      <PageHeader label="Работать" title="Практика и карьера — рядом с домом."
        lead="Practice House, исследовательские и профессиональные пространства позволяют вести частную практику, проводить супервизии и развивать карьеру, не покидая PSYTY." />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionLabel>Профессиональная среда</SectionLabel>
          <p className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.25] text-balance">
            Дом отдельно — практика отдельно. Бронируйте пространства через приложение и работайте в окружении коллег.
          </p>
        </div>
      </section>

      <Facility id="practice" label="Practice House" title="Практика, не покидая свой город." dark
        lead="Профессиональный центр: терапевтические комнаты, групповые, супервизорские, семейные, детские, онлайн-студии, записи, семинарные."
        items={['Therapy rooms', 'Group rooms', 'Supervision', 'Family therapy', 'Child psychology', 'Online studios', 'Recording studios', 'Seminar rooms']}
        tagline="Резиденты бронируют пространства через приложение PSYTY" />

      <Facility id="lab" label="PSYTY Lab" title="Исследования рядом с практикой." image={IMG.lab} reverse
        lead="Круглосуточная исследовательская среда для квалифицированных резидентов: ведите исследования и публикуйте результаты, не покидая город."
        items={['EEG Lab', 'HRV / Психофизиология', 'Eye Tracking', 'Cognitive Research', 'Biofeedback', 'Psychosomatic Research']}
        tagline="Propose → Collaborate → Research → Publish" />

      <Facility id="hotel" label="Hotel · Bakery · Restaurant" title="Места для коллег и гостей." dark reverse
        lead="Бутик-отель для приглашённых лекторов, участников конференций и гостей резидентов. PSYTY Bakery — утренний кофе и встречи перед лекциями."
        items={['Hotel', 'Restaurant', 'Bakery', 'Coffee shop', 'Bookstore', 'Gallery', 'Lecture hall', 'Amphitheatre']} />

      <CtaBand title="Хотите вести практику в PSYTY?" to="/contact" label="Узнать об условиях" />
    </>
  );
}