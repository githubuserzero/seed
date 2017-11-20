import { InitialStateStore, UserInfoStore } from 'app/common/data';
import { CommonProps } from 'common';

export interface AppProps extends CommonProps {
  userInfo: UserInfoStore;
  initialState: InitialStateStore;
}