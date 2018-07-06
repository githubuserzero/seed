import { AsyncRouterStore } from 'ssenkit.router-store';

export default new AsyncRouterStore([
  {
    path: '/',
    exact: true,
    component: () => import('seed/router-components/main'),
  },
  {
    path: '/sample',
    component: () => import('seed/router-components/sample'),
  },
]);