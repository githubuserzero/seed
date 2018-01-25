import { InitialStateStore, UserInfoStore } from 'app/data';
import { CommonProps } from 'common';

export interface AppProps extends CommonProps {
  userInfo: UserInfoStore;
  initialState: InitialStateStore;
}