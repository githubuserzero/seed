import React from 'react';
import { RouterStore } from 'router-store';

export interface RouterContentsProps {
  routerStore: RouterStore;
}

export function RouterContents({routerStore}: RouterContentsProps) {
  return (
    <React.Fragment>
      {routerStore.getRoute('/')}
      {routerStore.getRoute('/sample')}
    </React.Fragment>
  );
}