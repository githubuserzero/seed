import { GlobalInjectedProps } from 'app';

export default () => ({initialState}: GlobalInjectedProps) => {
  initialState.clean();
}