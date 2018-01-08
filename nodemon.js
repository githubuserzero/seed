const nodemon = require('nodemon');

nodemon({
  watch: [
    'dist-dev/server/',
  ],
  exec: 'node -r source-map-support/register ./dist-dev/server',
});