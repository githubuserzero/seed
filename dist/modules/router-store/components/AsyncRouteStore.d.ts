import React from 'react';
import { Route, RouteProps } from 'react-router';
import { RouterStore } from './RouterStore';
export interface AsyncRoute {
    path: string;
    exact?: boolean;
    strict?: boolean;
    component: () => Promise<{
        default: React.ComponentType<any>;
    }>;
}
export declare class AsyncRouterStore implements RouterStore {
    private routes;
    private preloadIndex;
    constructor(routes: AsyncRoute[]);
    preload: (path: string) => Promise<void>;
    getRoute: (path: string) => React.ComponentElement<RouteProps, Route<RouteProps>>;
}
