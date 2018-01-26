import { SyncRouterStore } from 'ssenkit.router-store';

export default new SyncRouterStore([
  {
    path: '/',
    exact: true,
    component: require('app/router-components/main').default,
  },
  {
    path: '/sample',
    component: require('app/router-components/sample').default,
  },
]);