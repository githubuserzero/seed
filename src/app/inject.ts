import { Dispatch } from 'mobx-dispatcher';
import { InitialStateStore, IntlStore, UserInfoStore } from 'app/data';

export interface GlobalInjectedProps {
  userInfo: UserInfoStore;
  intl: IntlStore;
  initialState: InitialStateStore;
  
  dispatch: Dispatch;
}