import { App } from 'app';
import { AppContextProvider } from 'app/context';
import { cookieKeys } from 'app/data-types/cookie';
import { LanguageCode, languageCodes } from 'app/data-types/locale';
import { asyncRouteStore } from 'app/route/asyncRouteStore';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getBrowserLocale } from 'use-locale';
import { getBrowserTimezone } from 'use-timezone';
import '../polyfills';

function AppProvider() {
  return (
    <StrictMode>
      <BrowserRouter>
        <AppContextProvider initialState={window.__INITIAL_STATE__ || null}
                            currentLocale={getBrowserLocale<LanguageCode>({
                              cookieKey: cookieKeys.locale,
                              fallbackLanguageCodes: languageCodes,
                            })}
                            currentTimezone={getBrowserTimezone(cookieKeys.timezone)}>
          <App routeStore={asyncRouteStore}/>
        </AppContextProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

if (window.__INITIAL_STATE__) {
  asyncRouteStore.preload(location.pathname).then(() => {
    ReactDOM.hydrate((
      <AppProvider/>
    ), document.querySelector('#app'));
  });
} else {
  ReactDOM.render((
    <AppProvider/>
  ), document.querySelector('#app'));
}

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  module.hot.accept();
}