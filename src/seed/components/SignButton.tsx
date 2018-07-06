import { ContextState, withConsumer } from 'app/context';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { login, logout } from 'seed/actions';
import * as styles from './SignButton.module.scss';

export interface Props {
}

interface InternalProps extends InjectedIntlProps, ContextState {
}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'SignButton';
  
  render() {
    return this.props.user.user
      ? (
        <button className={styles.main}
                onClick={() => this.props.dispatch(logout())}>
          {this.props.user.inProgress ? '### ' : null}
          {this.props.intl.formatMessage({id: 'app.main.sign-button.logout'})}
          {' - '}
          {this.props.user.user.firstName}
          {' '}
          {this.props.user.user.lastName}
        </button>
      )
      : (
        <button className={styles.main}
                onClick={() => this.props.dispatch(login())}>
          {this.props.user.inProgress ? '### ' : null}
          {this.props.intl.formatMessage({id: 'app.main.sign-button.login'})}
        </button>
      );
  }
}

export default injectIntl<Props>(withConsumer<Props & InternalProps>(Component)) as React.ComponentClass<Props>;