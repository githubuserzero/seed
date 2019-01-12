import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Showcase } from 'showcase';
import '../polyfills';

ReactDOM.hydrate((
  <BrowserRouter>
    <Showcase/>
  </BrowserRouter>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  //console.clear();
  module.hot.accept();
}