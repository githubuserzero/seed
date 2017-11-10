import { InitialStateStore, IntlStore, intlStore, UserInfoStore } from 'app/data';
import 'app/styles';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Container from './Container';

export interface Stores {
  userInfo: UserInfoStore;
  intl: IntlStore;
  initialState: InitialStateStore;
}

class MobXProvider extends React.Component<{}, Stores> {
  render() {
    return (
      <Provider userInfo={this.state.userInfo}
                intl={this.state.intl}
                initialState={this.state.initialState}>
        <Container/>
      </Provider>
    );
  }
  
  componentWillMount() {
    this.setState({
      intl: intlStore,
      userInfo: new UserInfoStore,
      initialState: new InitialStateStore,
    });
  }
}

ReactDOM.render((
  <MobXProvider/>
), document.querySelector('#app'));


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