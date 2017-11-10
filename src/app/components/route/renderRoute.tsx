import * as React from 'react';

type ComponentClass = React.ComponentClass<{}> | React.StatelessComponent<{}> | React.ClassicComponentClass<{}>;

interface Props {
  props: object;
  load: Promise<{default: ComponentClass}>;
}

interface State {
  Component: ComponentClass;
}

class Container extends React.Component<Props, State> {
  state: State = {
    Component: null,
  };
  
  render() {
    return this.state.Component
      ? <this.state.Component {...this.props.props}/>
      : null;
  }
  
  componentWillMount() {
    this.props.load.then(({default: Component}) => {
      this.setState({Component});
    });
  }
}

export default (load: () => Promise<{default: ComponentClass}>) => {
  return props => <Container props={props} load={load()}/>;
}