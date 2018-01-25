import { InitialStateCleaner } from 'app/components/initialState';
import AsyncRouterContents from 'app/components/route/AsyncRouterContents';
import Main from 'app/components/main';
import { IntlStore } from 'common/data';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

export interface Props {

}

interface InternalProps {
  intl: IntlStore;
}

interface State {
}

@inject('intl') @observer
class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'App';
  
  render() {
    return (
      <IntlProvider locale={this.props.intl.language} messages={this.props.intl.messages}>
        <BrowserRouter>
          <Main routerContents={<AsyncRouterContents/>}>
            <InitialStateCleaner/>
          </Main>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

export default Component as React.ComponentClass<Props>;