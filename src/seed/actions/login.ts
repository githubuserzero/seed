import { ContextState } from 'app/context';

export default () => ({user, startLogin, abortLogin, updateUser}: ContextState) => {
  startLogin();
  
  try {
    setTimeout(() => {
      updateUser({
        firstName: 'Seoyeon',
        lastName: 'Lee',
        age: 37,
      });
    }, 1000);
  } catch (error) {
    abortLogin();
  }
}