import { GlobalInjectedProps } from 'frame';

export default () => ({userInfo}: GlobalInjectedProps) => {
  setTimeout(() => {
    userInfo.updateUser(null);
  }, 1000);
}