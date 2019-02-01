import { compareRouteOptions } from 'react-router-store';
import { asyncRouteStore } from './asyncRouteStore';
import { syncRouteStore } from './syncRouteStore';

describe('routeStore', () => {
  it('Should be matched stores options', () => {
    expect(compareRouteOptions(
      asyncRouteStore.getRouteOptions(),
      syncRouteStore.getRouteOptions(),
    )).toBeTruthy();
  });
});