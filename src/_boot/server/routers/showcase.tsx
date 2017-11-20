import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Showcase } from '../components';
import * as templates from '../templates';

const router: express.Router = express.Router();

function render(req: express.Request): string {
  // render with styled-components
  const sheet: ServerStyleSheet = new ServerStyleSheet;
  const body: string = renderToString(sheet.collectStyles((
    <Showcase url={req.url}/>
  )));
  
  // styled-components
  const styleTags: string = sheet.getStyleTags();
  
  return templates.showcase({
    body,
    styleTags,
  });
}

router.get('/showcase', (req, res) => {
  res.send(render(req));
});

router.get('/showcase/sample', (req, res) => {
  res.send(render(req));
});

export default router;