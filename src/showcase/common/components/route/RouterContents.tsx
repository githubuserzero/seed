import * as React from 'react';
import { Route } from 'react-router-dom';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return [
      <Route exact path="/showcase" component={require('showcase/router-components/main').default}/>,
      <Route path="/showcase/sample" component={require('showcase/router-components/sample').default}/>,
    ];
  }
}

export default Component as React.ComponentClass<Props>;