import Main from 'contents/main';
import Sample from 'contents/sample';
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
      <Route exact path="/" component={Main}/>,
      <Route path="/sample" component={Sample}/>,
    ];
  }
}

export default Component as React.ComponentClass<Props>;