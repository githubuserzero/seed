import { App } from 'app';
import { cookieKeys, LanguageCode, languageCodes } from 'app/config';
import { AppContextProvider } from 'app/context';
import { InitialState } from 'app/data-types/initialState';
import { syncRouteStore } from 'app/route/syncRouteStore';
import { render } from 'ejs';
import { Request } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import template from '../_templates/index.ejs';

export function renderApp(req: Request, contentsState: Partial<InitialState>): string {
  const locale: LanguageCode = req.cookies[cookieKeys.locale] || req.acceptsLanguages(...languageCodes) || languageCodes[0];
  const timezone: string = req.cookies[cookieKeys.timezone] || 'Asia/Seoul';
  
  const initialState: InitialState = {
    locale,
    ...contentsState,
  };
  
  const body: string = renderToString((
    <StaticRouter location={req.url} context={{}}>
      <AppContextProvider initialState={initialState}
                          currentLocale={locale}
                          currentTimezone={timezone}>
        <App routeStore={syncRouteStore}/>
      </AppContextProvider>
    </StaticRouter>
  ));
  
  return render(template, {
    base: '/',
    body,
    initialState: JSON.stringify(initialState),
  });
}