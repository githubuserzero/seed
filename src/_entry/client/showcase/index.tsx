import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Showcase } from 'showcase';
import '../polyfills';

ReactDOM.hydrate((
  <StrictMode>
    <BrowserRouter>
      <Showcase/>
    </BrowserRouter>
  </StrictMode>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  module.hot.accept();
}