import { GlobalInjectedProps } from 'app';

export default () => ({userInfo}: GlobalInjectedProps) => {
  setTimeout(() => {
    userInfo.updateUser({
      firstName: 'Seoyeon',
      lastName: 'Lee',
      age: 37,
    });
  }, 1000);
}