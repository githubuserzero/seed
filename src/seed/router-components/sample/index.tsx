import { ContextState, withConsumer } from 'app/context';
import { DateTime } from 'luxon';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { PortalSample } from './components';

export interface Props {

}

interface InternalProps extends InjectedIntlProps, ContextState {
}

interface State {
  testString: string;
  portal: HTMLDivElement | null;
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'app.router-components.sample';
  
  constructor(props: Props & InternalProps) {
    super(props);
    
    const testString: string = props.initialState && props.initialState.sample
      ? props.initialState.sample.testString
      : 'InitialValue';
    
    this.state = {
      testString,
      portal: null,
    };
  }
  
  render() {
    const dateFormat: string = 'z - ff';
    
    return (
      <div>
        {this.props.intl.formatMessage({id: 'app.sample.text'})}
        <br/>
        {this.state.testString}
        <br/>
        <ul>
          <li>
            Local: {DateTime.local().setLocale(this.props.language).toFormat(dateFormat)}
          </li>
          <li>
            Current: {DateTime.local().setZone(this.props.timezone.zoneName).setLocale(this.props.language).toFormat(dateFormat)}
          </li>
          <li>
            {DateTime.local().setZone('Asia/Singapore').setLocale(this.props.language).toFormat(dateFormat)}
          </li>
        </ul>
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
}

export default injectIntl<Props>(withConsumer<Props & InternalProps>(Component)) as React.ComponentClass<Props>;