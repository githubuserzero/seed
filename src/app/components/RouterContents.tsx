import React from 'react';
import { RouterStore } from 'router-store';

export interface Props {
  routerStore: RouterStore;
}

export function RouterContents({routerStore}: Props) {
  return (
    <React.Fragment>
      {routerStore.getRoute('/')}
      {routerStore.getRoute('/sample')}
    </React.Fragment>
  );
}