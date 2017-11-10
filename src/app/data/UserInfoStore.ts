import { action, observable } from 'mobx';
import { User } from './user';

export default class {
  @observable user: User = null;
  
  @action updateUser = (user: User) => {
    this.user = user;
  };
}