import * as React from 'react';
import { env } from 'styles';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface Props<T> {
  value: T;
  className?: string;
}

interface State {
  myname: string;
  myage: number;
}

class Component<T = string> extends React.Component<Props<T> & RouteComponentProps<{}>, State> {
  //static defaultProps: Partial<Props<string>> = {
  //  className: '',
  //};
  
  state: State = {
    myname: 'aaaa',
    myage: 12,
  };
  
  render() {
    return (
      <div className={this.props.className}>
        {this.props.value.toString()} ({typeof this.props.value} / {env.xxx})
      </div>
    );
  }
  
  componentWillMount() {
    const x: {
      myname: string
    } = {
      myname: 'Lee',
    };
    this.setState(x);
  }
}

// @formatter:off
export default withRouter<{}>(styled(Component)`/// styled
  border: 3px solid ${env.xxx};
  background-color: #cccccc;
`) as new<T = string>(props: Props<T>) => React.Component<Props<T>, State>;
export type As<T> = new(props: Props<T>) => React.Component<Props<T>, State>;
// @formatter:on
