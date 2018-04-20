import { ContextState } from 'app/context';

export default () => ({user}: ContextState) => {
  const {update} = user.updateUser();
  
  setTimeout(() => {
    update(null);
  }, 1000);
}