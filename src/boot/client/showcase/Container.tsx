import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    );
  }
}

export default Component as React.ComponentClass<Props>;