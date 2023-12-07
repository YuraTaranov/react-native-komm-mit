import {Languages} from '@constants';

export const mapServerLangToAppLang = (lang: 'ua' | 'ru' | 'en' | 'de'): Languages => {
  switch (lang) {
    case 'ua':
      return Languages.UK;
    case 'ru':
      return Languages.RU;
    case 'en':
      return Languages.EN;
    case 'de':
      return Languages.DE;
    default:
      return Languages.UK;
  }
};
