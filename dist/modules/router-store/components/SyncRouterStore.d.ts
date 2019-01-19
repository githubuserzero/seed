import React from 'react';
import { Route, RouteProps } from 'react-router';
import { RouterStore } from './RouterStore';
export interface SyncRoute {
    path: string;
    exact?: boolean;
    strict?: boolean;
    component: React.ComponentType<any>;
}
export declare class SyncRouterStore implements RouterStore {
    private routes;
    constructor(routes: SyncRoute[]);
    preload: (path: string) => Promise<void>;
    getRoute: (path: string) => React.ComponentElement<RouteProps, Route<RouteProps>>;
}
