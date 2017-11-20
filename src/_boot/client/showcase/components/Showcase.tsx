import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from 'showcase/components/main';

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
        <Main/>
      </BrowserRouter>
    );
  }
}

export default Component as React.ComponentClass<Props>;