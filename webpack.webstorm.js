const path = require('path');
const fs = require('fs');
const {web} = require('./config.json');

// NOTICE
// This file is for Webstorm (IntelliJ) alias support.

module.exports = {
  resolve: {
    alias: fs.readdirSync('src/shared')
             .map(dir => 'src/shared/' + dir)
             .filter(dir => fs.statSync(dir).isDirectory())
             .reduce((alias, dir) => {
               alias[path.basename(dir)] = path.resolve(__dirname, dir);
               return alias;
             }, {}),
  },
  
  externals: web.externals,
};