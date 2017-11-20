import { AppProps } from 'app/common';

export default () => ({userInfo}: AppProps) => {
  setTimeout(() => {
    userInfo.updateUser(null);
  }, 1000);
}