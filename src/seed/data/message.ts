import { Language, languages, cookieKeys } from 'app/data';
import IntlMessageFormat from 'intl-messageformat';
import * as Cookie from 'js-cookie';

export {
  languages,
  Language,
};

type Messages = {[language: string]: {[id: string]: string}};

export const messages: Messages = require('../../messages.json');

export const updateLanguage: () => (language: Language) => Language = () => language => {
  Cookie.set(cookieKeys.locale, language);
  return language;
};

export function formatMessage(messageId: string, values?: object): string {
  const language: Language = Cookie.get(cookieKeys.locale) as Language || 'en';
  const format: IntlMessageFormat = new IntlMessageFormat(messages[language][messageId], language);
  return format.format(values);
}