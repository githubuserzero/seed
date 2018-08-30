import * as moment from 'moment-timezone';

import app from 'server';
import * as config from '../../../config.json';

const port: number = process.env.PORT || config.server.port;

app.listen(port, () => {
  console.log(`SSR server started ${port} [${moment().format('HH:mm:ss')}]`);
});