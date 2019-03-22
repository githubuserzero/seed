import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteStore, Suspense } from 'react-router-store';

export interface RouterContentsProps {
  routeStore: RouteStore;
}

function LoadingMessage() {
  return <div>Loading...</div>;
}

export function RouterContents({routeStore}: RouterContentsProps) {
  return (
    <Suspense fallback={<LoadingMessage/>}>
      <Switch>
        {routeStore.getAllRoutes()}
      </Switch>
    </Suspense>
  );
}