import * as React from 'react';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'Component30834512';
  
  render() {
    return (
      <div>Showcase Main</div>
    );
  }
}

export default Component as React.ComponentClass<Props>;