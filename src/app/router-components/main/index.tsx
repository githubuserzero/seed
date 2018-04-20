import * as React from 'react';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'app.router-components.main';
  
  render() {
    return (
      <div>Main</div>
    );
  }
}

export default Component as React.ComponentClass<Props>;