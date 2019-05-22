import React from 'react';
import { useAppContextState } from '../context';
import { LanguageCode, languageCodes } from '../context/config';

export function LanguageChangeButton() {
  const {locale, updateLocale} = useAppContextState();
  
  return (
    <>
      {
        languageCodes.map((languageCode: LanguageCode) => (
          <button key={languageCode}
                  className={languageCode === locale ? 'active' : ''}
                  onClick={() => updateLocale(languageCode)}>
            {languageCode}
          </button>
        ))
      }
    </>
  );
}