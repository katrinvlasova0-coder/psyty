import React from 'react';
import PageHeader from '@/components/psity/PageHeader';
import PropertyCatalogue from '@/components/psity/PropertyCatalogue';

export default function CataloguePage() {
  return (
    <>
      <PageHeader label="Каталог" title="Недвижимость в PSYTY."
        lead="Каталог формируется на этапе Founding Residents. Главная ценность — не квадратные метры, а среда, в которой находится недвижимость." />
      <PropertyCatalogue />
    </>
  );
}