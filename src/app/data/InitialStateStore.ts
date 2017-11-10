import { InitialState } from './initialState';

export default class InitialStateStore {
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