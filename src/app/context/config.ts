// Set cookie key names
export enum cookieKeys {
  locale = 'locale',
  timezone = 'timezone',
}

// Set support languages
//tslint:disable-next-line:typedef
export const languageCodes = ['en-US', 'ko-KR'] as const;
export type LanguageCode = typeof languageCodes[number];