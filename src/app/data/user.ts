import { InitialState } from './initialState';
import produce from 'immer';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
}

export enum UserStoreProgress {
  none,
  login,
  logout,
}

export interface UserStore {
  user: User | null;
  inProgress: UserStoreProgress;
}

export function createUserStore(initialState: InitialState | null): UserStore {
  return {
    user: initialState ? initialState.user : null,
    inProgress: UserStoreProgress.none,
  };
}

export const startLogin: (userStore: UserStore) => () => UserStore = userStore => () => {
  if (userStore.inProgress !== UserStoreProgress.none) {
    throw new Error('');
  }
  
  return produce(userStore, draft => {
    draft.inProgress = UserStoreProgress.login;
  });
};

export const abortLogin: (userStore: UserStore) => () => UserStore = userStore => () => {
  if (userStore.inProgress !== UserStoreProgress.login) {
    throw new Error('');
  }
  
  return produce(userStore, draft => {
    draft.inProgress = UserStoreProgress.none;
  });
};

export const startLogout: (userStore: UserStore) => () => UserStore = userStore => () => {
  if (userStore.inProgress !== UserStoreProgress.none) {
    throw new Error('');
  }
  
  return produce(userStore, draft => {
    draft.inProgress = UserStoreProgress.logout;
  });
};

export const abortLogout: (userStore: UserStore) => () => UserStore = userStore => () => {
  if (userStore.inProgress !== UserStoreProgress.logout) {
    throw new Error('');
  }
  
  return produce(userStore, draft => {
    draft.inProgress = UserStoreProgress.none;
  });
};

export const updateUser: (userStore: UserStore) => (user: User | null) => UserStore = userStore => user => {
  return produce(userStore, draft => {
    draft.user = user;
    draft.inProgress = UserStoreProgress.none;
  });
};