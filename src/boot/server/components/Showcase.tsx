import Showcase from 'contents/showcase';
import * as React from 'react';
import { StaticRouter } from 'react-router-dom';

export interface Props {
  url: string;
}

interface InternalProps {
}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <StaticRouter location={this.props.url} context={{}}>
        <Showcase/>
      </StaticRouter>
    );
  }
}

export default Component as React.ComponentClass<Props>;