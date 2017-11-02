const nodemon = require('nodemon');

nodemon({
  watch: [
    'dist-dev/server/',
  ],
  exec: 'node ./dist-dev/server',
});