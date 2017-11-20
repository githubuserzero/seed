import { AppProps } from 'app/common';

export default () => ({userInfo}: AppProps) => {
  setTimeout(() => {
    userInfo.updateUser({
      firstName: 'Seoyeon',
      lastName: 'Lee',
      age: 37,
    });
  }, 1000);
}