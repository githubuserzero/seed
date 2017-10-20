import * as React from 'react';
import { Route } from 'react-router-dom';
import Main from '../contents/main';
import Sample from '../contents/sample';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return [
      <Route exact path="/showcase" component={Main}/>,
      <Route path="/showcase/sample" component={Sample}/>,
    ];
  }
}

export default Component as React.ComponentClass<Props>;