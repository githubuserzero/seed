import { App } from 'app';
import { AppContextProvider } from 'app/context';
import { cookieKeys } from 'app/data-types/cookie';
import { LanguageCode, languageCodes } from 'app/data-types/locale';
import { asyncRouteStore } from 'app/route/asyncRouteStore';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'shared/polyfills';
import { getBrowserLocale } from 'use-locale';
import { getBrowserTimezone } from 'use-timezone';

function AppProvider() {
  return (
    <HashRouter>
      <AppContextProvider initialState={null}
                          currentLocale={getBrowserLocale<LanguageCode>({
                            cookieKey: cookieKeys.locale,
                            fallbackLanguageCodes: languageCodes,
                          })}
                          currentTimezone={getBrowserTimezone(cookieKeys.timezone)}>
        <App routeStore={asyncRouteStore}/>
      </AppContextProvider>
    </HashRouter>
  );
}

ReactDOM.render((
  <AppProvider/>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  module.hot.accept();
}