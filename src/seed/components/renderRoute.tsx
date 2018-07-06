import * as React from 'react';

type ComponentClass = React.ComponentClass<{}> | React.StatelessComponent<{}> | React.ClassicComponentClass<{}>;

interface Props {
  props: object;
  load: Promise<{default: ComponentClass}>;
}

interface State {
  Component: ComponentClass | null;
}

class Container extends React.PureComponent<Props, State> {
  state: State = {
    Component: null,
  };
  
  constructor(props: Props) {
    super(props);
    props.load.then(({default: Component}) => {
      this.setState({Component});
    });
  }
  
  render() {
    return this.state.Component
      ? <this.state.Component {...this.props.props}/>
      : null;
  }
}

export default (load: () => Promise<{default: ComponentClass}>) => {
  return props => <Container props={props} load={load()}/>;
}