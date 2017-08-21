const entry = {
  'init': [
    './src/polyfills',
  ],
  'app': './src/app',
  'component-showcase': './src/component-showcase',
};

const dlls = {
  dll: [
    './src/vendor',
    './src/polyfills',
  ],
};

const externals = {};

const directory = {
  debug: 'dist-debug',
  production: 'dist',
  dll: 'dll',
  static: ['static', 'node_modules/@nebula/nebula-ui/src'],
};

const port = process.env.PORT || 3100;

module.exports = {
  entry,
  dlls,
  directory,
  port,
  externals,
};
