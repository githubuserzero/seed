import RouterContents from 'app/components/route/RouterContents';
import Main from 'app/components/main';
import { IntlStore } from 'common/data';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { StaticRouter } from 'react-router-dom';

export interface Props {
  url: string;
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
        <StaticRouter location={this.props.url} context={{}}>
          <Main routerContents={<RouterContents/>}/>
        </StaticRouter>
      </IntlProvider>
    );
  }
}

export default Component as React.ComponentClass<Props>;