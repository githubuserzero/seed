import { ContextState } from 'app/context';

export default () => ({initialState}: ContextState) => {
  if (initialState.initialState) {
    initialState.clean();
  }
}