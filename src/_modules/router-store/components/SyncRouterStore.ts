import React from 'react';
import { Route, RouteProps } from 'react-router';
import { RouterStore } from './RouterStore';

// tslint:disable:no-any
export interface SyncRoute {
  path: string;
  exact?: boolean;
  strict?: boolean;
  component: React.ComponentType<any>;
}

export class SyncRouterStore implements RouterStore {
  constructor(private routes: SyncRoute[]) {
  }
  
  preload = (path: string) => {
    return Promise.resolve();
  };
  
  getRoute = (path: string) => {
    const route: SyncRoute | undefined = this.routes.find(item => item.path === path);
    
    if (route) {
      const props: RouteProps = {};
      props.path = route.path;
      props.exact = route.exact === true;
      props.strict = route.strict === true;
      props.component = route.component;
      
      return React.createElement(Route, props);
    } else {
      throw new Error(`Can't find matched path. ${path}`);
    }
  };
}