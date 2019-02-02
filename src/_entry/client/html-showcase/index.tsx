import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect, Route, RouteProps } from 'react-router-dom';
import { Showcase } from 'showcase';
import '../polyfills';

ReactDOM.hydrate((
  <StrictMode>
    <HashRouter>
      <Route path="/" render={({location}: RouteProps) => {
        return location && location.pathname === '/'
          ? <Redirect to="/showcase"/>
          : <Showcase/>;
      }}/>
    </HashRouter>
  </StrictMode>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  module.hot.accept();
}