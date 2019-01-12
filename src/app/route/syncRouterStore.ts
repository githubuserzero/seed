import { SyncRouterStore } from 'router-store';

export const syncRouterStore: SyncRouterStore = new SyncRouterStore([
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