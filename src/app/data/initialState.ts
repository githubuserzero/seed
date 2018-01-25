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

export class InitialStateStore {
  constructor(private initialState: InitialState = null) {
  }
  
  clean = () => {
    this.initialState = null;
  };
  
  hasState = () => {
    return this.initialState !== null;
  };
  
  getState = () => {
    return this.initialState;
  };
}