import React from 'react';
import { RouteStore } from 'react-router-store';

export interface RouterContentsProps {
  routeStore: RouteStore;
}

export function RouterContents({routeStore}: RouterContentsProps) {
  return (
    <>
      {routeStore.getAllRoutes()}
    </>
  );
}