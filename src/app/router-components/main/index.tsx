import * as React from 'react';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'Component13224130';
  
  render() {
    return (
      <div>Main</div>
    );
  }
}

export default Component as React.ComponentClass<Props>;