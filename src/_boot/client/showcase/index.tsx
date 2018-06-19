import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Showcase } from './components';

ReactDOM.hydrate((
  <Showcase/>
), document.querySelector('#app'));

if (module.hot) {
  Error.stackTraceLimit = Infinity;
  console.clear();
  module.hot.accept();
}