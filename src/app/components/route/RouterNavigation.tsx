import * as React from 'react';
import { Link } from 'react-router-dom';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'RouterNavigation';
  
  render() {
    return (
      <React.Fragment>
        <Link to="/">Home</Link>
        <Link to="/sample">Sample</Link>
      </React.Fragment>
    );
  }
}

export default Component as React.ComponentClass<Props>;