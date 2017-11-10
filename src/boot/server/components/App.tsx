import { IntlStore } from 'app/data';
import App from 'contents/app';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { StaticRouter } from 'react-router-dom';
import RouterContents from './RouterContents';

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
  render() {
    return (
      <IntlProvider locale={this.props.intl.language} messages={this.props.intl.messages}>
        <StaticRouter location={this.props.url} context={{}}>
          <App routerContents={<RouterContents/>}/>
        </StaticRouter>
      </IntlProvider>
    );
  }
}

export default Component as React.ComponentClass<Props>;