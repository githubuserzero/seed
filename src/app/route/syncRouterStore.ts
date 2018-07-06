import { SyncRouterStore } from 'ssenkit.router-store';

export default new SyncRouterStore([
  {
    path: '/',
    exact: true,
    component: require('seed/router-components/main').default,
  },
  {
    path: '/sample',
    component: require('seed/router-components/sample').default,
  },
]);