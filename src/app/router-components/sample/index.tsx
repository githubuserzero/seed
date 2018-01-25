import { InitialStateStore } from 'app/data';
import { inject } from 'mobx-react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { PortalSample } from './components';

export interface Props {

}

interface InternalProps extends InjectedIntlProps {
  initialState: InitialStateStore;
}

interface State {
  testString: string;
  portal: HTMLDivElement;
}

@inject('initialState')
class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'Component35529047';
  
  state: State = {
    testString: 'Initial Value',
    portal: null,
  };
  
  render() {
    return (
      <div>
        {this.props.intl.formatMessage({id: 'app.sample.text'})}
        <br/>
        {this.state.testString}
        <br/>
        <button onClick={this.openPortal}>Open portal</button>
        <br/>
        {this.state.portal ? createPortal(<PortalSample/>, this.state.portal) : null}
      </div>
    );
  }
  
  openPortal = () => {
    if (this.state.portal) return;
    
    const div: HTMLDivElement = document.createElement('div');
    document.body.appendChild(div);
    this.setState({
      portal: div,
    });
  };
  
  componentWillMount() {
    if (this.props.initialState.hasState()) {
      this.setState({
        testString: this.props.initialState.getState().sample.testString,
      });
    }
  }
}

export default injectIntl<Props>(Component) as React.ComponentClass<Props>;