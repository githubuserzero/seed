import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'shared/polyfills';
import { Showcase } from 'showcase';

ReactDOM.hydrate((
  <BrowserRouter>
    <Showcase/>
  </BrowserRouter>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  module.hot.accept();
}