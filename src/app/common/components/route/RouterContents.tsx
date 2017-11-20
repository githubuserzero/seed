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
      <Route exact path="/" component={require('app/router-components/main').default}/>,
      <Route path="/sample" component={require('app/router-components/sample').default}/>,
    ];
  }
}

export default Component as React.ComponentClass<Props>;