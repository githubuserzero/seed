import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IntlStore } from 'stores';

export interface Props {

}

interface InternalProps {
  intl: IntlStore;
}

interface State {
}

@inject('intl') @observer
class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <div>{this.props.intl.language}</div>
    );
  }
}

export default Component as React.ComponentClass<Props>;