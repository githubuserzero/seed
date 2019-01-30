import { RouteStore, SyncRouteStore } from 'react-router-store';

export const syncRouteStore: RouteStore = new SyncRouteStore([
  {
    path: '/',
    exact: true,
    component: require('../route-components/main').default,
  },
  {
    path: '/sample',
    component: require('../route-components/sample').default,
  },
]);