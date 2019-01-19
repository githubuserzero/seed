import React from 'react';
export interface RouterStore {
    preload: (path: string) => Promise<void>;
    getRoute: (path: string) => React.ReactElement<{}>;
}
