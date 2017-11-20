import { action, observable } from 'mobx';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
}

export class UserInfoStore {
  @observable user: User = null;
  
  @action updateUser = (user: User) => {
    this.user = user;
  };
}