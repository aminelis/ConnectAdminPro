// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json'; // Importez le fichier de traduction pour l'anglais
import translationFR from './locales/fr/translation.json'; // Importez le fichier de traduction pour le français

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN, // Utilisez les traductions pour l'anglais
    },
    fr: {
      translation: translationFR, // Utilisez les traductions pour le français
    },
  },
  lng: 'en', // langue par défaut
  fallbackLng: 'en', // langue de secours si la langue demandée n'est pas disponible
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
