import * as React from 'react';
import { RouterContents, RouterNavigation } from './components';
import './index.scss';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
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