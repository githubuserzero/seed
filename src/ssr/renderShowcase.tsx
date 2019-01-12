import { render } from 'ejs';
import { Request } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Showcase } from 'showcase';
import template from '../_templates/showcase.ejs';

export function renderShowcase(req: Request): string {
  const body: string = renderToString((
    <StaticRouter location={req.url} context={{}}>
      <Showcase/>
    </StaticRouter>
  ));
  
  return render(template, {
    base: '/',
    body,
  });
}