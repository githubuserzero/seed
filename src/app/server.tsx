import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import Koa from 'koa';
import Router, { RouterContext } from 'koa-router';
import moment from 'moment-timezone';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './app';
import { AppContextProvider } from './context';
import { cookieKeys, LanguageCode, languageCodes } from './context/config';
import { InitialState } from './data/initialState';

const port: number = Number(process.env.SERVER_PORT || 4100);

const app: Koa = new Koa();
const router: Router = new Router();

// ---------------------------------------------
// router
// ---------------------------------------------
router.get('/', async (ctx: RouterContext) => {
  ctx.body = await render(ctx, {
    sample: {
      testString: 'SERVER SIDE RENDERING INITIAL STATE',
    },
  });
});

router.get('/translation-sample', async (ctx: RouterContext) => {
  ctx.body = await render(ctx, {});
});

router.get('/timezone-sample', async (ctx: RouterContext) => {
  ctx.body = await render(ctx, {});
});

// ---------------------------------------------
// express start
// ---------------------------------------------
app.use(router.routes());
app.listen(port, () => {
  console.log(`SSR server started ${port} [${moment().format('HH:mm:ss')}]`);
});

// ---------------------------------------------
// render
// ---------------------------------------------
export async function render(ctx: RouterContext, contentsState: Partial<InitialState>): Promise<string> {
  const locale: LanguageCode = ctx.cookies.get(cookieKeys.locale) as LanguageCode || ctx.acceptsLanguages(...languageCodes) || languageCodes[0];
  const timezone: string = ctx.cookies.get(cookieKeys.timezone) || 'Asia/Seoul';
  
  const initialState: InitialState = {
    ...contentsState,
  };
  
  const stats: object = require('loadable-stats.json');
  const extractor: ChunkExtractor = new ChunkExtractor({stats, entrypoints: 'app'});
  
  const body: string = renderToString((
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={ctx.url} context={{}}>
        <AppContextProvider initialState={initialState}
                            currentLocale={locale}
                            currentTimezone={timezone}>
          <App/>
        </AppContextProvider>
      </StaticRouter>
    </ChunkExtractorManager>
  ));
  
  return template({
    locale,
    base: '/',
    body,
    initialState: JSON.stringify(initialState),
    extractor,
  });
}

// ---------------------------------------------
// template
// ---------------------------------------------
export const template: (params: {locale: LanguageCode, base: string, body: string, initialState: string, extractor: ChunkExtractor}) => string = ({locale, base, body, initialState, extractor}) => `
<!DOCTYPE html>
<html lang="${locale.substr(0, 2)}">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="theme-color" content="#000000" />
    <link rel="shortcut icon" href="favicon.ico"/>
    <link rel="manifest" href="manifest.json" />
    ${extractor.getLinkTags()}
    ${extractor.getStyleTags()}
    <base href="${base}"/>
    <title>App</title>
  
    <script>
      window.__INITIAL_STATE__ = ${initialState.replace(/</g, '\\u003c')};
    </script>
  </head>
  
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app">${body}</div>
    ${extractor.getScriptTags()}
  </body>
</html>
`;