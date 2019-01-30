import { App } from 'app';
import { AppContextProvider } from 'app/context';
import { cookieKeys } from 'app/data-types/cookie';
import { InitialState } from 'app/data-types/initialState';
import { LanguageCode } from 'app/data-types/locale';
import { syncRouteStore } from 'app/route/syncRouteStore';
import { render } from 'ejs';
import { Request } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import template from '../_templates/index.ejs';

export function renderApp(req: Request, contentsState: Partial<InitialState>): string {
  const locale: LanguageCode = req.cookies[cookieKeys.locale] || 'en-US';
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