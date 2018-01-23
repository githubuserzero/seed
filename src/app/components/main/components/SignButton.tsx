import { login, logout } from 'app/common/actions';
import { UserInfoStore } from 'app/common/data';
import { Dispatch, dispatcher } from 'mobx-dispatcher';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

export interface Props {
}

interface InternalProps extends InjectedIntlProps {
  className: string;
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
        <button className={this.props.className}
                onClick={() => this.props.dispatch(logout())}>
          {this.props.intl.formatMessage({id: 'app.main.sign-button.logout'})}
          {' - '}
          {this.props.userInfo.user.firstName}
          {' '}
          {this.props.userInfo.user.lastName}
        </button>
      )
      : (
        <button className={this.props.className}
                onClick={() => this.props.dispatch(login())}>
          {this.props.intl.formatMessage({id: 'app.main.sign-button.login'})}
        </button>
      );
  }
}

export default styled<Props>(injectIntl<Props>(Component))`
  border: 2px solid darkslateblue;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
` as React.ComponentClass<Props>;