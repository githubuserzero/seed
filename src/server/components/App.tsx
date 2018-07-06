import Main from 'app/components/main';
import RouterContents from 'app/components/route/RouterContents';
import { ContextState, withConsumer } from 'app/context';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { StaticRouter } from 'react-router-dom';
import { messages } from 'seed/data';

export interface Props {
  url: string;
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
        <StaticRouter location={this.props.url} context={{}}>
          <Main routerContents={<RouterContents/>}/>
        </StaticRouter>
      </IntlProvider>
    );
  }
}

export default withConsumer<Props & InternalProps>(Component) as React.ComponentClass<Props>;