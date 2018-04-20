import * as React from 'react';
import { RouterContents, RouterNavigation } from 'showcase/components/route';
import './index.scss';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'Component29708806';
  
  render() {
    return (
      <div>
        <RouterNavigation/>
        <RouterContents/>
      </div>
    );
  }
}

export default Component as React.ComponentClass<Props>;