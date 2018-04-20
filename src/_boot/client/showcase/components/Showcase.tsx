import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from 'showcase/components/main';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'Showcase';
  
  render() {
    return (
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    );
  }
}

export default Component as React.ComponentClass<Props>;