import { AppProps } from 'app';
import { InitialStateStore, UserInfoStore } from 'app/data';
import routerStore from 'app/route/asyncRouterStore';
import { intlStore } from 'common/data';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components';

class MobXProvider extends React.Component<{}, AppProps> {
  render() {
    return (
      <Provider userInfo={this.state.userInfo}
                intl={this.state.intl}
                initialState={this.state.initialState}>
        <App/>
      </Provider>
    );
  }
  
  componentWillMount() {
    if (window.__INITIAL_STATE__) {
      const userInfo: UserInfoStore = new UserInfoStore;
      
      intlStore.updateLanguage(window.__INITIAL_STATE__.intl.language);
      userInfo.updateUser(window.__INITIAL_STATE__.userInfo.user);
      
      this.setState({
        intl: intlStore,
        userInfo,
        initialState: new InitialStateStore(window.__INITIAL_STATE__),
      });
    } else {
      this.setState({
        intl: intlStore,
        userInfo: new UserInfoStore,
        initialState: new InitialStateStore,
      });
    }
  }
}

if (window.__INITIAL_STATE__) {
  routerStore.preload(location.pathname).then(() => {
    ReactDOM.hydrate((
      <MobXProvider/>
    ), document.querySelector('#app'));
  });
} else {
  ReactDOM.render((
    <MobXProvider/>
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