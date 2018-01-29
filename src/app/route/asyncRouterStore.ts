import { AsyncRouterStore } from 'ssenkit.router-store';

export default new AsyncRouterStore([
  {
    path: '/',
    exact: true,
    component: () => System.import('app/router-components/main'),
  },
  {
    path: '/sample',
    component: () => System.import('app/router-components/sample'),
  },
]);