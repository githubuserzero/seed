import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';

// Set cookie key names
export const cookieKeys: {[key: string]: string} = {
  locale: 'locale',
  timezone: 'timezone',
};

// Set support languages
export type LanguageCode = 'en-US' | 'ko-KR';
export const languageCodes: LanguageCode[] = ['en-US', 'ko-KR'];

addLocaleData(en);
addLocaleData(ko);