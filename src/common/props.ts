import { Dispatch } from 'mobx-dispatcher';
import { IntlStore } from './data';

export interface CommonProps {
  intl: IntlStore;
  dispatch: Dispatch;
}