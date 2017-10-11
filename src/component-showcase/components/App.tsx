import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { IntlStore } from 'stores';
import styled from 'styled-components';
import RouterContents from './RouterContents';
import RouterNavigation from './RouterNavigation';

export interface Props {

}

interface InternalProps {
  className: string;
  intl: IntlStore;
}

interface State {
}

@inject('intl') @observer
class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <HashRouter>
        <div className={this.props.className}>
          <RouterNavigation/>
          <RouterContents/>
        </div>
      </HashRouter>
    );
  }
}

export default styled<Props>(Component)`

` as React.ComponentClass<Props>;