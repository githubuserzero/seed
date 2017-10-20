import { GlobalInjectedProps } from 'frame';

export default () => ({initialState}: GlobalInjectedProps) => {
  initialState.clean();
}