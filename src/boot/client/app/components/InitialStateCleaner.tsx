import { cleanInitialState } from 'app/actions';
import { Dispatch, dispatcher } from 'mobx-dispatcher';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface Props {

}

interface InternalProps extends RouteComponentProps<{}> {
  dispatch: Dispatch;
}

interface State {
  initialPath: string;
}

@dispatcher
class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return null;
  }
  
  componentWillMount() {
    this.setState({
      initialPath: this.props.location.pathname,
    });
  }
  
  componentWillReceiveProps(nextProps: Readonly<Props & InternalProps>) {
    if (this.state.initialPath && this.state.initialPath !== nextProps.location.pathname) {
      this.setState({
        initialPath: null,
      });
      this.props.dispatch(cleanInitialState());
    }
  }
}

export default withRouter<Props>(Component) as React.ComponentClass<Props>;