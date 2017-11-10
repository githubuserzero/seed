import { renderRoute } from 'app/components';
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
      <Route exact path="/" render={renderRoute(() => import('contents/main'))}/>,
      <Route path="/sample" render={renderRoute(() => import('contents/sample'))}/>,
    ];
  }
}

export default Component as React.ComponentClass<Props>;