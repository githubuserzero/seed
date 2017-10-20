const nodemon = require('nodemon');

nodemon({
  watch: [
    'dist-dev/ssr/',
  ],
  exec: 'node ./dist-dev/ssr',
});