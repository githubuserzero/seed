import { initialState, InitialState, user } from 'app/data';
import { Language, message, messages } from 'common/data';
import * as Cookie from 'js-cookie';
import * as React from 'react';
import * as Recontext from 'recontext';

interface Props {
  initialState: InitialState | null;
}

type ContextState = Recontext.ContextState<{
  user: user.Store;
  initialState: initialState.Store;
  message: message.Store;
}>

// @ts-ignore
const {Provider: ReactProvider, Consumer} = React.createContext<ContextState>();

class Provider extends Recontext.Provider<ContextState, Props> {
  constructor(props: Props) {
    super(props);
    
    const language: Language = props.initialState
      ? props.initialState.message.language
      : Cookie.get('locale') as Language || 'en';
    
    this.state = {
      contextState: {
        dispatch: this.dispatch,
        subscribe: this.subscribe,
        initialState: initialState.createStore(this, {
          initialState: props.initialState,
        }),
        user: user.createStore(this, {
          user: props.initialState
            ? props.initialState.user.user
            : null,
        }),
        message: message.createStore(this, {
          language: language,
          messages: messages[language],
        }),
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