import loadable from '@loadable/component';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';

const routes: ReactElement = (
  <Switch>
    <Route path="/" exact
           component={loadable(() => import('../pages/Home'))}/>
    <Route path="/translation-sample"
           component={loadable(() => import('../pages/TranslationSample'))}/>
    <Route path="/timezone-sample"
           component={loadable(() => import('../pages/TimezoneSample'))}/>
  </Switch>
);

export function RouterContents() {
  return routes;
}