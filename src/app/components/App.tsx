import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { HashRouter } from 'react-router-dom';
import { IntlStore } from 'stores';
import styled from 'styled-components';
import LanguageChangeButton from './LanguageChangeButton';
import RouterContents from './RouterContents';
import RouterNavigation from './RouterNavigation';
import SignButton from './SignButton';

export interface Props {

}

interface InternalProps {
  className: string;
  intl: IntlStore;
}

interface State {
}

@inject('intl') @observer
class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <IntlProvider locale={this.props.intl.language} messages={this.props.intl.messages}>
        <HashRouter>
          <div className={this.props.className}>
            <div>
              <LanguageChangeButton/>
              <SignButton/>
            </div>
            <RouterNavigation/>
            <RouterContents/>
          </div>
        </HashRouter>
      </IntlProvider>
    );
  }
}

export default styled<Props>(Component)`

` as React.ComponentClass<Props>;