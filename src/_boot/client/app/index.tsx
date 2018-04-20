import { Props as AppProps, Provider } from 'app/context';
import routerStore from 'app/route/asyncRouterStore';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components';

class AppProvider extends React.PureComponent<{}, AppProps> {
  render() {
    return (
      <Provider initialState={window.__INITIAL_STATE__ || null}>
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
  
  const reporter: {success: () => void} = window['__webpack_hot_middleware_reporter__'];
  const success: () => void = reporter.success;
  reporter.success = () => {
    // reload css
    const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll('link[href][rel=stylesheet]') as NodeListOf<HTMLLinkElement>;
    let f: number = links.length;
    while (--f >= 0) {
      const link: HTMLLinkElement = links[f];
      link.href = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
    }
    
    success();
  };
}