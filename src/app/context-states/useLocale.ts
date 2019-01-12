import { useCallback, useState } from 'react';
import { LanguageCode, setBrowserLocale } from '../data-types/locale';

export interface Result {
  locale: LanguageCode;
  updateLocale: (languageCode: LanguageCode) => void;
}

export function useLocale(currentLocale: LanguageCode): Result {
  const [locale, setLocale] = useState<LanguageCode>(currentLocale);
  
  const updateLocale: (nextLanguageCode: LanguageCode) => void = useCallback((nextLanguageCode: LanguageCode) => {
    setLocale(nextLanguageCode);
    setBrowserLocale(nextLanguageCode);
  }, [setLocale]);
  
  return {
    locale,
    updateLocale,
  };
}