import * as templates from 'server/templates';
import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Showcase } from '../components';

const router: express.Router = express.Router();

function render(req: express.Request): string {
  const body: string = renderToString((
    <Showcase url={req.url}/>
  ));
  
  return templates.showcase({
    body,
  });
}

router.get('/showcase', (req, res) => {
  res.send(render(req));
});

router.get('/showcase/sample', (req, res) => {
  res.send(render(req));
});

export default router;