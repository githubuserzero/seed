import * as React from 'react';
import { Route } from 'react-router-dom';

export interface Props {

}

interface InternalProps {

}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'RouterContents';
  
  render() {
    return (
      <React.Fragment>
        <Route exact path="/showcase" component={require('showcase/router-components/main').default}/>
        <Route path="/showcase/sample" component={require('showcase/router-components/sample').default}/>
      </React.Fragment>
    );
  }
}

export default Component as React.ComponentClass<Props>;