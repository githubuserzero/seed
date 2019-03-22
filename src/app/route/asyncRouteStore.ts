import { AsyncRouteStore, RouteStore } from 'react-router-store';

export const asyncRouteStore: RouteStore = new AsyncRouteStore([
  {
    path: '/',
    exact: true,
    component: () => import('../pages/main'),
  },
  {
    path: '/translation-sample',
    component: () => import('../pages/translation-sample'),
  },
  {
    path: '/timezone-sample',
    component: () => import('../pages/timezone-sample'),
  },
]);