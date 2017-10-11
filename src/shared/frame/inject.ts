import { UserInfoStore, IntlStore } from 'stores';
import { Dispatch } from 'mobx-dispatcher';

export interface GlobalInjectedProps {
  userInfo: UserInfoStore;
  intl: IntlStore;
  dispatch: Dispatch;
}