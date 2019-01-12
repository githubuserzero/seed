/// <reference path="react"/>

// tslint:disable:no-any
declare module '*.ejs' {
  const content: string;
  export = content;
}

declare module '*.css' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.less' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.json' {
  const content: any;
  export = content;
}

declare module '*.svg' {
  const content: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export = content;
}

interface Window {
  __INITIAL_STATE__: any;
}

// highlight.js
declare const hljs: any;