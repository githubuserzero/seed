import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect } from 'react-router-dom';
import { Showcase } from 'showcase';
import '../polyfills';

ReactDOM.hydrate((
  <HashRouter>
    <Redirect exact path="/" to="/showcase"/>
    <Showcase/>
  </HashRouter>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  //console.clear();
  module.hot.accept();
}