import React from 'react';
import PageHeader from '@/components/psity/PageHeader';
import LeadForm from '@/components/psity/LeadForm';
import QuestionForm from '@/components/psity/QuestionForm';
import PresentationDownload from '@/components/psity/PresentationDownload';

export default function ContactPage() {
  return (
    <>
      <PageHeader label="Контакты" title="Найдите своё место в PSYTY."
        lead="Расскажите о себе — и мы свяжемся, чтобы предложить персональное место в среде PSYTY. Можно также запросить закрытую презентацию проекта." />
      <LeadForm />
      <QuestionForm />
      <PresentationDownload />
    </>
  );
}