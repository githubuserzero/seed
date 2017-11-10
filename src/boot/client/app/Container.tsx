import { IntlStore } from 'app/data';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
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
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

export default Component as React.ComponentClass<Props>;