import React from 'react';
import { RouteComponentProps } from 'react-router';
export declare function render(load: () => Promise<{
    default: React.ComponentType<any>;
}>): ((props: RouteComponentProps<any>) => React.ReactNode);
