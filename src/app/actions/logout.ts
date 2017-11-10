import { GlobalInjectedProps } from 'app';

export default () => ({userInfo}: GlobalInjectedProps) => {
  setTimeout(() => {
    userInfo.updateUser(null);
  }, 1000);
}