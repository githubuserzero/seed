const path = require('path');
const fs = require('fs');
const {web} = require('./config.json');

// NOTICE
// This file is for Webstorm (IntelliJ) alias support.

module.exports = {
  resolve: {
    alias: fs.readdirSync('src/library')
             .map(dir => 'src/library/' + dir)
             .filter(dir => fs.statSync(dir).isDirectory())
             .reduce((alias, dir) => {
               alias[path.basename(dir)] = path.resolve(__dirname, dir);
               return alias;
             }, {
               app: __dirname + '/src/app',
               contents: __dirname + '/src/contents',
               messages: __dirname + '/src/messages',
             }),
  },
  
  externals: web.externals,
};