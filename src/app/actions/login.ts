import { ContextState } from 'app/context';

export default () => ({user}: ContextState) => {
  const {update} = user.updateUser();
  
  setTimeout(() => {
    update({
      firstName: 'Seoyeon',
      lastName: 'Lee',
      age: 37,
    });
  }, 1000);
}