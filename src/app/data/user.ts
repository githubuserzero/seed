import * as Recontext from 'recontext';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
}

export module user {
  interface State {
    user: User | null;
    inProgress: boolean;
  }
  
  interface Actions {
    updateUser: () => ({
      update: (user: User | null) => void;
      abort: (error?: Error) => void;
    });
  }
  
  export type Store = State & Actions;
  
  export const createStore: Recontext.CreateStore<State, Actions> = Recontext.createStore<State, Actions>(
    {
      user: null,
      inProgress: false,
    },
    setState => ({
      updateUser: prevState => () => {
        setState({
          inProgress: true,
        });
        
        return {
          update: (user: User | null) => {
            if (prevState.user !== user) {
              setState({
                user,
                inProgress: false,
              });
            }
          },
          abort: (error?: Error) => {
            setState({
              inProgress: false,
            });
          },
        };
      },
    }),
  );
}