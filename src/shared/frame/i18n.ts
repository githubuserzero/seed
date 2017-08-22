import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import * as XHR from 'i18next-xhr-backend';

export const languages: string[] = ['en', 'ko'];

export default i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    ns: ['common', 'app'],
    defaultNS: 'common',
    
    debug: true,
    
    backend: {
      loadPath: 'locales/{{ns}}/{{lng}}.json',
    },
    
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
      format: (value: string, format?: string, lng?: string) => {
        return (format === 'uppercase') ? value.toUpperCase() : value;
      },
    },
  });
