import { RouteStore, SyncRouteStore } from 'react-router-store';

export const syncRouteStore: RouteStore = new SyncRouteStore([
  {
    path: '/',
    exact: true,
    component: require('../pages/main').default,
  },
  {
    path: '/translation-sample',
    component: require('../pages/translation-sample').default,
  },
  {
    path: '/timezone-sample',
    component: require('../pages/timezone-sample').default,
  },
]);