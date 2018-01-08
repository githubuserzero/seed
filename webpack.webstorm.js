const config = require('./config.json');
const createSSenpack = require('ssenpack');

// NOTICE
// This file is for Webstorm (IntelliJ) alias support.

const {editor} = createSSenpack(config);

module.exports = {
  resolve: {
    alias: editor.alias(),
  },
  
  externals: config.web.externals,
};