import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect, Route, RouteProps } from 'react-router-dom';
import 'shared/polyfills';
import { Showcase } from 'showcase';

ReactDOM.hydrate((
  <HashRouter>
    <Route path="/" render={({location}: RouteProps) => {
      return location && location.pathname === '/'
        ? <Redirect to="/showcase"/>
        : <Showcase/>;
    }}/>
  </HashRouter>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  module.hot.accept();
}