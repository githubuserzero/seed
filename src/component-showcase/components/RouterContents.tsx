import { renderRoute } from 'components';
import * as React from 'react';
import { Route } from 'react-router-dom';
import Main from './Main';

export default () => (
  <div>
    <Route exact path="/" component={Main}/>
    <Route path="/sample" render={renderRoute(() => import('../contents/sample'))}/>
  </div>
);