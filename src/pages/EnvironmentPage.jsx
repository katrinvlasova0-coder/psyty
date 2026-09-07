import React from 'react';
import PageHeader from '@/components/psity/PageHeader';
import Masterplan from '@/components/psity/Masterplan';
import Infrastructure from '@/components/psity/Infrastructure';

export default function EnvironmentPage() {
  return (
    <>
      <PageHeader label="Среда" title="Окружение, в котором строится жизнь."
        lead="PSYTY — это сначала среда: инфраструктура, ландшафт и возможности. Дома лишь часть того, что окружает вас каждый день." />
      <Masterplan />
      <Infrastructure />
    </>
  );
}