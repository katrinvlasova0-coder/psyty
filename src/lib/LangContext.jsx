import React, { createContext, useContext, useState } from 'react';

const LangContext = createContext({ lang: 'ru', setLang: () => {}, t: (k) => k });

const dict = {
  ru: {
    navEnvironment: 'Среда', navLive: 'Жить', navStudy: 'Учиться', navWork: 'Работать',
    navCatalogue: 'Каталог', navCommunity: 'Сообщество', navContact: 'Контакты',
    ctaProperty: 'Выбрать недвижимость', ctaResident: 'Стать резидентом', ctaPresentation: 'Получить презентацию', ctaContact: 'Связаться',
  },
  en: {
    navEnvironment: 'Environment', navLive: 'Live', navStudy: 'Study', navWork: 'Work',
    navCatalogue: 'Catalogue', navCommunity: 'Community', navContact: 'Contact',
    ctaProperty: 'Choose property', ctaResident: 'Become a resident', ctaPresentation: 'Get presentation', ctaContact: 'Contact',
  },
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ru');
  const t = (k) => (dict[lang][k] ?? k);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);