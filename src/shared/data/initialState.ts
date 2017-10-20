import { User } from './user';

export interface InitialState {
  intl: {
    language: string;
  }
  
  userInfo: {
    user: User;
  }
  
  sample?: {
    testString: string;
  }
}