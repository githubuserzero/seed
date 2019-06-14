import { loadableReady } from '@loadable/component';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getBrowserLocale } from 'use-locale';
import { getBrowserTimezone } from 'use-timezone';
import { App } from './app';
import { AppContextProvider } from './context';
import { cookieKeys, LanguageCode, languageCodes } from './context/config';

require('react-app-polyfill/ie11');
require('regenerator-runtime');
require('url-search-params-polyfill');

function AppProvider() {
  const currentLocale: LanguageCode = getBrowserLocale<LanguageCode>({
    cookieKey: cookieKeys.locale,
    fallbackLanguageCodes: Array.from(languageCodes),
  });
  
  const currentTimezone: string = getBrowserTimezone(cookieKeys.timezone);
  
  return (
    <BrowserRouter>
      <AppContextProvider initialState={window.__INITIAL_STATE__}
                          currentLocale={currentLocale}
                          currentTimezone={currentTimezone}>
        <App/>
      </AppContextProvider>
    </BrowserRouter>
  );
}

loadableReady().then(() => {
  hydrate((
    <AppProvider/>
  ), document.querySelector('#app'));
});

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  module.hot.accept();
}