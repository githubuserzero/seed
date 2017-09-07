/**
 @typedef {Object.<string, Array.<string> | string>} Entry
 @typedef {Object.<string, Array.<string>>} DLL
 @typedef {Object.<string, string>} Externals
 @typedef {Object.<string, Array.<string> | string>} Directory
 @typedef {{group?: string}} Lib
 @typedef {Object.<string, Lib>} Libs
 */

/** @type Entry */
const entry = {
  'init': [
    './src/polyfills',
  ],
  'app': './src/app',
  'component-showcase': './src/component-showcase',
};

/** @type DLL */
const dll = {
  dll: [
    './src/vendor',
    './src/polyfills',
  ],
};

/** @type Externals */
const externals = {};

const directory = {
  debug: 'dist-debug',
  production: 'dist',
  dll: 'dll',
  static: ['static'],
};

/** @type Libs */
const libs = {
  'open-react-modal': {},
};

const port = process.env.PORT || 3100;

module.exports = {
  entry,
  dll,
  directory,
  port,
  externals,
  libs,
};
