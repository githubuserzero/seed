import * as React from 'react';

export type Teardown = () => void;
export type Action<ContextState> = (contextState: ContextState) => (Teardown | void);
export type Subscription<ContextState> = (state: ContextState, prevState: ContextState) => void;

export type ContextState<T> = T & {
  dispatch: (action: Action<ContextState<T>>) => Teardown;
  subscribe: (subscription: (state: ContextState<T>, prevState: ContextState<T>) => void) => Teardown;
}

export class Provider<ContextState, Props = {}, State = {}> extends React.Component<Props, State & {contextState: ContextState}> {
  static displayName: string = 'Recontext.Provider';
  
  private teardowns: Set<Teardown> = new Set;
  private subscriptions: Set<Subscription<ContextState>> = new Set;
  
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State & {contextState: ContextState}>) {
    if (prevState.contextState !== this.state.contextState && this.subscriptions.size > 0) {
      for (const subscription of this.subscriptions) {
        subscription(this.state.contextState, prevState.contextState);
      }
    }
  }
  
  componentWillUnmount() {
    for (const teardown of this.teardowns) {
      teardown();
    }
    
    this.teardowns.clear();
    this.subscriptions.clear();
  }
  
  protected setContextState = (stateOrProducer: Partial<ContextState> | ((contextState: ContextState) => Partial<ContextState>)) => {
    this.setState({
      contextState: Object.assign(
        {},
        this.state.contextState,
        typeof stateOrProducer === 'function'
          ? stateOrProducer(this.state.contextState)
          : stateOrProducer,
      ),
    });
  };
  
  protected dispatch: (action: Action<ContextState>) => Teardown = action => {
    const teardown: Teardown | void = action(this.state.contextState);
    
    if (typeof teardown === 'function') {
      let broken: boolean = false;
      
      this.teardowns.add(teardown);
      
      return () => {
        if (!broken && this.teardowns.has(teardown)) {
          teardown();
          this.teardowns.delete(teardown);
        }
        broken = true;
      };
    } else {
      return () => {
        // blank teardown
      };
    }
  };
  
  protected subscribe: (subscription: (state: ContextState, prevState: ContextState) => void) => Teardown = subscription => {
    if (!this.subscriptions.has(subscription)) {
      this.subscriptions.add(subscription);
    }
    
    return () => {
      this.subscriptions.delete(subscription);
    };
  };
  
  // tslint:disable
  protected bindReducer: (getState?: (contextState: ContextState) => any) => (reducer: Function) => (setState: (result: any) => Partial<ContextState>) => any = getState => reducer => setState => {
    return (...args: any[]) => {
      const param: any = typeof getState === 'function'
        ? getState(this.state.contextState)
        : undefined;
      const result: any = reducer(param)(...args);
      this.setContextState(setState(result));
    };
  };
  // tslint:enable
}