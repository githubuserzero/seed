import { Dispatch } from 'mobx-dispatcher';
import { InitialStateStore, IntlStore, UserInfoStore } from 'stores';

export interface GlobalInjectedProps {
  userInfo: UserInfoStore;
  intl: IntlStore;
  initialState: InitialStateStore;
  
  dispatch: Dispatch;
}