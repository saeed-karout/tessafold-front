import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationAR from '../src/data/locales/ar/translation.json';
import translationEN from '../src/data/locales/en/translation.json';
import translationDE from '../src/data/locales/de/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: translationAR },
      en: { translation: translationEN },
      de: { translation: translationDE },
    },
    lng: 'en', // اللغة الافتراضية
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;