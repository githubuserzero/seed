const {web} = require('./config.json');
const alias = require('./webpack.alias');

// NOTICE
// This file is for Webstorm (IntelliJ) alias support.

module.exports = {
  resolve: {
    alias,
  },
  
  externals: web.externals,
};