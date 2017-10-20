import App from 'contents/app';
import * as React from 'react';
import InitialStateCleaner from './InitialStateCleaner';
import RouterContents from './RouterContents';

export interface Props {

}

interface InternalProps {
}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <App routerContents={<RouterContents/>}>
        <InitialStateCleaner/>
      </App>
    );
  }
}

export default Component as React.ComponentClass<Props>;