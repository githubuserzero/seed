import { i18n } from 'frame';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { HashRouter } from 'react-router-dom';
import { UserInfoStore } from 'stores';
import styled from 'styled-components';
import LanguageChangeButton from './components/LanguageChangeButton';
import SignButton from './components/SignButton';
import Test, { As as TestAs } from './components/Test';
import * as styles from './index.scss';

const StringTest: TestAs<string> = Test;
const NumberTest: TestAs<number> = Test;
const BooleanTest: TestAs<boolean> = Test;

console.log('index.tsx..()', styles.cls);

const App: React.ComponentClass<{}> = styled(class extends React.Component<{className: string}, {}> {
  render() {
    return (
      <Provider userInfo={new UserInfoStore}>
        <HashRouter>
          <div className={this.props.className}>
            <div>
              <LanguageChangeButton/>
              <SignButton/>
            </div>
            <div className={styles.cls}>
              <Test value="abc"/>
              <StringTest value="abc"/>
              <NumberTest value={123}/>
              <BooleanTest value={false}/>
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
})`// styled
`;

// DOM Render
ReactDOM.render((
  <I18nextProvider i18n={i18n}>
    <App/>
  </I18nextProvider>
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
    //closeModals();
    
    // alive body scroll
    //document.body.style.overflow = '';
    
    success();
  };
}