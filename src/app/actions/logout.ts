import { AppProps } from 'app';

export default () => ({userInfo}: AppProps) => {
  setTimeout(() => {
    userInfo.updateUser(null);
  }, 1000);
}