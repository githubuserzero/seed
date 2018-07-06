import Main from 'app/components/main';
import AsyncRouterContents from 'app/components/route/AsyncRouterContents';
import { ContextState, withConsumer } from 'app/context';
import { messages } from 'seed/data';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { HashRouter } from 'react-router-dom';

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
        <HashRouter>
          <Main routerContents={<AsyncRouterContents/>}/>
        </HashRouter>
      </IntlProvider>
    );
  }
}

export default withConsumer<Props & InternalProps>(Component) as React.ComponentClass<Props>;