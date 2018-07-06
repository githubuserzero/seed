import Main from 'app/components/main';
import AsyncRouterContents from 'app/components/route/AsyncRouterContents';
import { ContextState, withConsumer } from 'app/context';
import { messages } from 'seed/data';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { InitialStateCleaner } from 'seed/components';

export interface Props {

}

interface InternalProps extends ContextState {
}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'App';
  
  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <BrowserRouter>
          <Main routerContents={<AsyncRouterContents/>}>
            <InitialStateCleaner/>
          </Main>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

export default withConsumer<Props & InternalProps>(Component) as React.ComponentClass<Props>;