import { PropTypes } from 'mobx-react';
import * as React from 'react';

const contextTypes: object = Object.freeze({
  mobxStores: PropTypes.objectOrObservableObject,
});

export const dispatcher: ((InnerComponent: React.ComponentClass<{}>) => React.ComponentClass<{}>) = InnerComponent => {
  const displayName: string = 'dispatch-' + (InnerComponent.displayName || InnerComponent.name || (InnerComponent.constructor && InnerComponent.constructor.name) || 'Unknown');
  
  return class extends React.Component<{}, {}> {
    static displayName: string = displayName;
    static contextTypes: object = contextTypes;
    
    private store: (() => void)[];
    
    render() {
      return React.createElement(InnerComponent, Object.assign({}, this.props, {dispatch: this.dispatch}));
    }
    
    componentWillMount() {
      this.store = [];
    }
    
    componentWillUnmount() {
      this.store.forEach(teardown => teardown());
      this.store = null;
    }
    
    dispatch = (action?: Function) => {
      if (!action || typeof action !== 'function') {
        return () => {
          // empty function
        };
      }
      
      const t: (() => void) = action(Object.assign(
        {},
        this.context.mobxStores,
        {dispatch: this.dispatch},
      ));
      
      let broken: boolean = false;
      
      const teardown: (() => void) = () => {
        if (!broken && typeof t === 'function') t();
        broken = true;
      };
      
      this.store.push(teardown);
      
      return teardown;
    };
  };
};