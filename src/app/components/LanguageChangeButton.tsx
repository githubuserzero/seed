import React from 'react';
import { useAppContextState } from '../context';
import { languageCodes } from '../data-types/locale';

export function LanguageChangeButton() {
  const {locale, updateLocale} = useAppContextState();
  
  return (
    <div>
      {locale}
      {' : '}
      {
        languageCodes.map(languageCode => (
          <button key={languageCode} onClick={() => updateLocale(languageCode)}>
            {languageCode}
          </button>
        ))
      }
    </div>
  );
}