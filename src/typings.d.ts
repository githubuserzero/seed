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
  const content: object;
  export = content;
}