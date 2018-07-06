import { ContextState } from 'app/context';

export default () => ({initialState, cleanInitialState}: ContextState) => {
  if (initialState) {
    cleanInitialState();
  }
}