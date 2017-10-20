import Showcase from 'contents/showcase';
import * as React from 'react';

export interface Props {

}

interface InternalProps {
}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <Showcase/>
    );
  }
}

export default Component as React.ComponentClass<Props>;