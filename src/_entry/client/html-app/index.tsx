import { App } from 'app';
import { AppContextProvider } from 'app/context';
import { cookieKeys } from 'app/data-types/cookie';
import { getBrowserLocale } from 'app/data-types/locale';
import { asyncRouteStore } from 'app/route/asyncRouteStore';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { getBrowserTimezone } from 'use-timezone';
import '../polyfills';

function AppProvider() {
  return (
    <StrictMode>
      <HashRouter>
        <AppContextProvider initialState={null}
                            currentLocale={getBrowserLocale()}
                            currentTimezone={getBrowserTimezone(cookieKeys.timezone)}>
          <App routeStore={asyncRouteStore}/>
        </AppContextProvider>
      </HashRouter>
    </StrictMode>
  );
}

ReactDOM.render((
  <AppProvider/>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  module.hot.accept();
}