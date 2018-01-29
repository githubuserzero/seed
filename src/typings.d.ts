declare module '!!sass-variable-loader!*.scss' {
  const content: {};
  export = content;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.css' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.json' {
  // tslint:disable
  const content: any;
  // tslint:enable
  export = content;
}

interface Window {
  // tslint:disable
  __INITIAL_STATE__: any;
  // tslint:enable
}

declare class System {
  // tslint:disable
  static import(path: string): Promise<any>;
  // tslint:enable
}