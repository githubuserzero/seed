import { renderRoute } from 'common/components/route';
import * as React from 'react';
import { Route } from 'react-router-dom';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'AsyncRouterContents';
  
  render() {
    return [
      <Route exact path="/" render={renderRoute(() => import('app/router-components/main'))}/>,
      <Route path="/sample" render={renderRoute(() => import('app/router-components/sample'))}/>,
    ];
  }
}

export default Component as React.ComponentClass<Props>;