// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import arTranslation from '../locales/ar.json';
import frTranslation from '../locales/fr.json';
import esTranslation from '../locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    lng: 'ar', // Set default language
    fallbackLng: 'ar', // Fallback to English if translation missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Set to true if you're using Suspense
    },
  });

export default i18n;
