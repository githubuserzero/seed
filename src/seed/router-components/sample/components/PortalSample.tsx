import { ContextState, withConsumer } from 'app/context';
import * as React from 'react';

export interface Props {

}

interface InternalProps extends ContextState {
}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'PortalSample';
  
  render() {
    return (
      <div>{this.props.language}</div>
    );
  }
}

export default withConsumer<Props & InternalProps>(Component) as React.ComponentClass<Props>;