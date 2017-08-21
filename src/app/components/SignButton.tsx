import { login, logout } from 'actions';
import { Dispatch, dispatcher } from 'mobx-dispatcher';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { UserInfoStore } from 'stores';
import styled from 'styled-components';

interface Props extends InjectedTranslateProps {
  userInfo: UserInfoStore;
  className: string;
  dispatch: Dispatch;
}

@inject('userInfo') @dispatcher @observer
class Component extends React.Component<Props, {}> {
  render() {
    return this.props.userInfo.user
      ? (
        <button className={this.props.className}
                onClick={() => this.props.dispatch(logout())}>
          {this.props.t('logout')} - {this.props.userInfo.user.firstName} {this.props.userInfo.user.lastName}
        </button>
      )
      : (
        <button className={this.props.className}
                onClick={() => this.props.dispatch(login())}>
          {this.props.t('login')}
        </button>
      );
  }
}

const ConnectedComponent: React.ComponentClass<{}> = styled(translate('app')(Component))`// styled
  border: 2px solid darkslateblue;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
`;

export default ConnectedComponent;