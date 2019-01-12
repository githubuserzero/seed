import cookie from 'js-cookie';
import { cookieKeys } from './cookie';

export type LanguageCode = 'en-US' | 'ko-KR';
export const languageCodes: LanguageCode[] = ['en-US', 'ko-KR'];

export function getBrowserLocale(): LanguageCode {
  return (cookie.get(cookieKeys.locale) || 'en-US') as LanguageCode;
}

export function setBrowserLocale(locale: LanguageCode) {
  cookie.set(cookieKeys.locale, locale);
}