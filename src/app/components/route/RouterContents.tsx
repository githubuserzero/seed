import routerStore from 'app/route/syncRouterStore';
import * as React from 'react';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'RouterContents';
  
  render() {
    return (
      <React.Fragment>
        {routerStore.getRoute('/')}
        {routerStore.getRoute('/sample')}
      </React.Fragment>
    );
  }
}

export default Component as React.ComponentClass<Props>;