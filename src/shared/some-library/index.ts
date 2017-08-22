export { dispatcher } from './dispatcher';

// tslint:disable
export type Action = (injected: any) => (() => void) | void;
export type Dispatch = (action: Action | any) => () => void;
