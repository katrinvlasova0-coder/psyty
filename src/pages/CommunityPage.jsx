import React from 'react';
import PageHeader from '@/components/psity/PageHeader';
import Community from '@/components/psity/Community';
import FoundingResidents from '@/components/psity/FoundingResidents';
import CtaBand from '@/components/psity/CtaBand';

export default function CommunityPage() {
  return (
    <>
      <PageHeader label="Сообщество" title="Ваши соседи имеют значение."
        lead="PSYTY — про жизнь среди людей, разделяющих уважение к рефлексии, развитию, диалогу и психологической культуре. Первые резиденты помогают установить эту культуру." />
      <Community />
      <FoundingResidents />
      <CtaBand title="Познакомьтесь с нашими экспертами" to="/experts" label="Наши эксперты" />
    </>
  );
}