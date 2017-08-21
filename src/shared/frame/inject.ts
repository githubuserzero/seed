import { UserInfoStore } from 'stores';
import { Dispatch } from 'mobx-dispatcher';

export interface GlobalInjectedProps {
  userInfo: UserInfoStore;
  dispatch: Dispatch;
}