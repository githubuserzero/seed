const path = require('path');
const fs = require('fs');

const alias = {};

fs.readdirSync('src')
  .filter(dir => dir[0] !== '_')
  .map(dir => 'src/' + dir)
  .filter(dir => fs.statSync(dir).isDirectory())
  .forEach(dir => {
    alias[path.basename(dir)] = path.resolve(__dirname, dir);
  });

fs.readdirSync('src/_library')
  .map(dir => 'src/_library/' + dir)
  .filter(dir => fs.statSync(dir).isDirectory())
  .forEach(dir => {
    alias[path.basename(dir)] = path.resolve(__dirname, dir);
  });

module.exports = alias;