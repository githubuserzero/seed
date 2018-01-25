import { login, logout } from 'app/actions';
import { UserInfoStore } from 'app/data';
import { Dispatch, dispatcher } from 'mobx-dispatcher';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import * as styles from './SignButton.module.scss';

export interface Props {
}

interface InternalProps extends InjectedIntlProps {
  dispatch: Dispatch;
  userInfo: UserInfoStore;
}

interface State {
}

@inject('userInfo') @dispatcher @observer
class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'SignButton';
  
  render() {
    return this.props.userInfo.user
      ? (
        <button className={styles.main}
                onClick={() => this.props.dispatch(logout())}>
          {this.props.intl.formatMessage({id: 'app.main.sign-button.logout'})}
          {' - '}
          {this.props.userInfo.user.firstName}
          {' '}
          {this.props.userInfo.user.lastName}
        </button>
      )
      : (
        <button className={styles.main}
                onClick={() => this.props.dispatch(login())}>
          {this.props.intl.formatMessage({id: 'app.main.sign-button.login'})}
        </button>
      );
  }
}

export default injectIntl<Props>(Component) as React.ComponentClass<Props>;