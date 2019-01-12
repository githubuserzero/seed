import { AsyncRouterStore } from 'router-store';

export const asyncRouterStore: AsyncRouterStore = new AsyncRouterStore([
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