import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en/common.json';
import ru from '../public/locales/ru/common.json';
import kgz from '../public/locales/kgz/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    kgz: { translation: kgz },
  },
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
