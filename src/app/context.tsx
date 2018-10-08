import {
  abortLogin,
  abortLogout,
  cookieKeys,
  createUserStore,
  InitialState,
  startLogin,
  startLogout,
  updateUser,
  User,
  UserStore,
} from 'app/data';
import * as Cookie from 'js-cookie';
import * as React from 'react';
import * as Recontext from 'recontext';
import { getTimezone, Language, Timezone, updateLanguage, updateTimezone } from 'seed/data';

interface Props {
  initialState: InitialState | null;
  currentTimezone: string;
}

type ContextState = Recontext.ContextState<{
  user: UserStore;
  initialState: InitialState | null;
  language: Language,
  timezone: Timezone;
  
  cleanInitialState: () => void;
  updateTimezone: (timezone: string | Timezone) => void;
  updateLanguage: (language: Language) => void;
  startLogin: () => void;
  startLogout: () => void;
  abortLogin: () => void;
  abortLogout: () => void;
  updateUser: (user: User | null) => void;
}>

// @ts-ignore
const {Provider: ReactProvider, Consumer} = React.createContext<ContextState>();

class Provider extends Recontext.Provider<ContextState, Props> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      contextState: {
        // tools
        dispatch: this.dispatch,
        subscribe: this.subscribe,
        
        // states
        initialState: props.initialState,
        user: createUserStore(props.initialState),
        language: props.initialState
          ? props.initialState.language
          : Cookie.get(cookieKeys.locale) as Language || 'en',
        timezone: getTimezone(this.props.currentTimezone),
        
        // actions
        cleanInitialState: () => {
          this.setContextState({
            initialState: null,
          });
        },
        updateTimezone: this.bindReducer()(updateTimezone)(timezone => ({timezone})),
        updateLanguage: this.bindReducer()(updateLanguage)(language => ({language})),
        updateUser: this.bindReducer(({user}) => user)(updateUser)(user => ({user})),
        startLogin: this.bindReducer(({user}) => user)(startLogin)(user => ({user})),
        startLogout: this.bindReducer(({user}) => user)(startLogout)(user => ({user})),
        abortLogin: this.bindReducer(({user}) => user)(abortLogin)(user => ({user})),
        abortLogout: this.bindReducer(({user}) => user)(abortLogout)(user => ({user})),
      },
    };
  }
  
  render() {
    return (
      <ReactProvider value={this.state.contextState}>
        {this.props.children}
      </ReactProvider>
    );
  }
}

function withConsumer<Props>(Component: React.ComponentType<Props>): React.ComponentType<ContextState & Props> {
  return class extends React.PureComponent<ContextState & Props, {}> {
    render() {
      return (
        <Consumer>
          {
            state => <Component {...state} {...this.props}/>
          }
        </Consumer>
      );
    }
  };
}

export {
  Provider,
  Consumer,
  withConsumer,
  ContextState,
  Props,
};