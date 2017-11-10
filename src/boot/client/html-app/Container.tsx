import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { HashRouter } from 'react-router-dom';
import { IntlStore } from 'app/data';
import { App } from './components';

export interface Props {

}

interface InternalProps {
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
          <App/>
        </HashRouter>
      </IntlProvider>
    );
  }
}

export default Component as React.ComponentClass<Props>;