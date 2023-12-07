import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import * as localize from 'react-native-localize';
import {Languages} from '../../constants';
// import moment from 'moment';
import 'moment/locale/ru';

const ru = require('./translations/ru.json');
const uk = require('./translations/uk.json');
const en = require('./translations/en.json');
const de = require('./translations/de.json');

// const languageCodes = localize.getLocales().map(locale => locale.languageCode);
// const {languageTag}: any = localize.findBestAvailableLanguage(languageCodes);

const defaultLanguage = Languages.RU;

// moment.updateLocale('ru', {parentLocale: 'ru'});

i18n.use(initReactI18next).init({
  resources: {
    [Languages.RU]: {translation: ru},
    [Languages.UK]: {translation: uk},
    [Languages.EN]: {translation: en},
    [Languages.DE]: {translation: de},
  },
  lng: defaultLanguage,
  fallbackLng: Languages.RU,
  compatibilityJSON: 'v2',
  react: {
    nsMode: 'default',
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  nsSeparator: false,
  keySeparator: '.',
  debug: true,
});

export default i18n;
