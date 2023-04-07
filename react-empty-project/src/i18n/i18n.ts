import { Language } from '@/utils/enum/language';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: Language.RU,
  react: {
    useSuspense: false,
  },
  fallbackLng: Language.RU,
  keySeparator: '.',
  nsSeparator: ':',
  resources: {},
  interpolation: {
    escapeValue: false,
  },
});
