import { Language } from 'common/data';
import * as Recontext from 'recontext';
import { User } from './user';

export interface InitialState {
  message: {
    language: Language;
  }
  
  user: {
    user: User | null;
  }
  
  sample?: {
    testString: string;
  }
}

export module initialState {
  interface State {
    initialState: InitialState | null;
  }
  
  interface Actions {
    clean: () => void;
  }
  
  export type Store = State & Actions;
  
  export const createStore: Recontext.CreateStore<State, Actions> = Recontext.createStore<State, Actions>(
    {
      initialState: null,
    },
    setState => ({
      clean: () => () => {
        setState({
          initialState: null,
        });
      },
    }),
  );
}