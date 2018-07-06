import { ContextState, withConsumer } from 'app/context';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { cleanInitialState } from 'seed/actions';

export interface Props {

}

interface InternalProps extends RouteComponentProps<{}>, ContextState {
}

interface State {
  initialPath: string | null;
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'InitialStateCleaner';
  
  static getDerivedStateFromProps(nextProps: Props & InternalProps, prevState: State): Partial<State> {
    if (prevState.initialPath && prevState.initialPath !== nextProps.location.pathname) {
      nextProps.dispatch(cleanInitialState());
      
      return {
        initialPath: null,
      };
    }
    
    return prevState;
  }
  
  constructor(props: Props & InternalProps) {
    super(props);
    
    this.state = {
      initialPath: props.location.pathname,
    };
  }
  
  render() {
    return null;
  }
}

export default withRouter<Props & InternalProps>(withConsumer<Props & InternalProps>(Component)) as React.ComponentClass<Props>;