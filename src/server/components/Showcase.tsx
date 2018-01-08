import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import Main from 'showcase/components/main';

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
        <Main/>
      </StaticRouter>
    );
  }
}

export default Component as React.ComponentClass<Props>;