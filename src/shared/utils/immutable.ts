import { Map } from 'immutable';

// tslint:disable
export type TypedMap<T, V = any> = Map<keyof T, V>;
export const TypedMap: <T, V = any>() => TypedMap<T, V> = Map;
// tslint:enable