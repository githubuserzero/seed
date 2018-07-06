import { Props as AppProps, Provider } from 'app/context';
import { getInitialTimezone } from 'seed/data';
import routerStore from 'app/route/asyncRouterStore';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components';

class AppProvider extends React.PureComponent<{}, AppProps> {
  render() {
    return (
      <Provider initialState={window.__INITIAL_STATE__ || null}
                currentTimezone={getInitialTimezone()}>
        <App/>
      </Provider>
    );
  }
}

if (window.__INITIAL_STATE__) {
  routerStore.preload(location.pathname).then(() => {
    ReactDOM.hydrate((
      <AppProvider/>
    ), document.querySelector('#app'));
  });
} else {
  ReactDOM.render((
    <AppProvider/>
  ), document.querySelector('#app'));
}


if (module.hot) {
  Error.stackTraceLimit = Infinity;
  console.clear();
  module.hot.accept();
}