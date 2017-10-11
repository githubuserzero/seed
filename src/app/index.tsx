import '!!message-loader!./messages/en.json?language=en';
import '!!message-loader!./messages/ko.json?language=ko';
import { Provider } from 'mobx-react';
import { closeModals } from 'open-react-modal';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlStore, UserInfoStore } from 'stores';
import { App } from './components';

ReactDOM.render((
  <Provider userInfo={new UserInfoStore} intl={new IntlStore}>
    <App/>
  </Provider>
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
    
    // remove modals
    closeModals();
    
    // alive body scroll
    //document.body.style.overflow = '';
    
    success();
  };
}