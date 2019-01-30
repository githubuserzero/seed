import { AsyncRouteStore, RouteStore } from 'react-router-store';

export const asyncRouteStore: RouteStore = new AsyncRouteStore([
  {
    path: '/',
    exact: true,
    component: () => import('../route-components/main'),
  },
  {
    path: '/sample',
    component: () => import('../route-components/sample'),
  },
]);