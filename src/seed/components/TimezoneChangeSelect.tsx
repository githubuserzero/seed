import { ContextState, withConsumer } from 'app/context';
import * as React from 'react';
import { changeTimezone } from 'seed/actions';
import { timezoneList, timezoneMap } from 'seed/data';
import * as styles from './TimezoneChangeSelect.module.scss';

export interface Props {
}

interface InternalProps extends ContextState {
}

interface State {
  timezone: string;
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'TimezoneChangeSelect';
  
  constructor(props: Props & InternalProps) {
    super(props);
    
    this.state = {
      timezone: props.timezone.zoneName,
    };
  }
  
  render() {
    return (
      <div>
        <input list="timezones"
               className={timezoneMap.has(this.state.timezone) ? styles.commit : styles.draft}
               value={this.state.timezone}
               onChange={this.onChange}/>
        <datalist id="timezones">
          {
            timezoneList.map(timezone => (
              <option key={timezone.zoneName} value={timezone.zoneName}/>
            ))
          }
        </datalist>
      </div>
    );
  }
  
  onChange = (event: React.ChangeEvent<{value: string}>) => {
    const timezone: string = event.target.value;
    
    if (timezoneMap.has(timezone)) {
      this.props.dispatch(changeTimezone(timezone));
    }
    
    this.setState({
      timezone,
    });
  };
}

export default withConsumer(Component) as React.ComponentType<Props>;