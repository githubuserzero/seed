import { ContextState } from 'app/context';

export default () => ({user, startLogout, abortLogout, updateUser}: ContextState) => {
  startLogout();
  
  try {
    setTimeout(() => {
      updateUser(null);
    }, 1000);
  } catch (error) {
    abortLogout();
  }
}