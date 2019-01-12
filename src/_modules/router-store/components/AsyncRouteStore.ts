import React from 'react';
import { matchPath, Route, RouteProps } from 'react-router';
import { render } from './render';
import { RouterStore } from './RouterStore';

// tslint:disable:no-any
export interface AsyncRoute {
  path: string;
  exact?: boolean;
  strict?: boolean;
  component: () => Promise<{default: React.ComponentType<any>}>;
}

export class AsyncRouterStore implements RouterStore {
  private preloadIndex: Map<AsyncRoute, React.ComponentType<any>>;
  
  constructor(private routes: AsyncRoute[]) {
    this.preloadIndex = new Map();
  }
  
  preload = (path: string) => {
    return new Promise<void>((resolve, reject) => {
      const config: AsyncRoute | undefined = this.routes.find(item => {
        const props: RouteProps = {};
        props.path = item.path;
        props.exact = item.exact === true;
        props.strict = item.strict === true;
        return matchPath(path, props) !== null;
      });
      
      if (config) {
        config.component().then(({default: Component}) => {
          this.preloadIndex.set(config, Component);
          resolve();
        });
      } else {
        reject(new Error(`Can't find matched route. ${path}`));
      }
    });
  };
  
  getRoute = (path: string) => {
    const route: AsyncRoute | undefined = this.routes.find(item => item.path === path);
    
    if (route) {
      const props: RouteProps = {};
      props.path = route.path;
      props.exact = route.exact === true;
      props.strict = route.strict === true;
      
      if (this.preloadIndex.has(route)) {
        props.component = this.preloadIndex.get(route);
      } else {
        props.render = render(route.component);
      }
      
      return React.createElement(Route, props);
    } else {
      throw new Error(`Can't find matched path. ${path}`);
    }
  };
}