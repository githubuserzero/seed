import { renderRoute } from 'components';
import * as React from 'react';
import { Route } from 'react-router-dom';

export default () => (
  <div>
    <Route exact path="/" render={renderRoute(() => import('../contents/main'))}/>
    <Route path="/sample" render={renderRoute(() => import('../contents/sample'))}/>
  </div>
);