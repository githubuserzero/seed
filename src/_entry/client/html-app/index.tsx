import { App } from 'app';
import { AppContextProvider } from 'app/context';
import { getBrowserLocale } from 'app/data-types/locale';
import { getBrowserTimezone } from 'app/data-types/timezone';
import { asyncRouterStore } from 'app/route/asyncRouterStore';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../polyfills';

function AppProvider() {
  return (
    <BrowserRouter>
      <AppContextProvider initialState={null}
                          currentLocale={getBrowserLocale()}
                          currentTimezone={getBrowserTimezone()}>
        <App routerStore={asyncRouterStore}/>
      </AppContextProvider>
    </BrowserRouter>
  );
}

ReactDOM.render((
  <AppProvider/>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  //console.clear();
  module.hot.accept();
}