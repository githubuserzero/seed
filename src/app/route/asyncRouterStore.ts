import { AsyncRouterStore } from 'ssenkit.router-store';

export default new AsyncRouterStore([
  {
    path: '/',
    exact: true,
    component: () => import('app/router-components/main'),
  },
  {
    path: '/sample',
    component: () => import('app/router-components/sample'),
  },
]);