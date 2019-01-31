import React, { Fragment } from 'react';
import { RouteStore } from 'react-router-store';

export interface RouterContentsProps {
  routeStore: RouteStore;
}

export function RouterContents({routeStore}: RouterContentsProps) {
  return (
    <Fragment>
      {routeStore.getAllRoutes()}
    </Fragment>
  );
}