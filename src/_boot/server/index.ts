import { DateTime } from 'luxon';

import app from 'server';
import * as config from '../../../config.json';

const port: number = process.env.PORT || config.server.port;

app.listen(port, () => {
  console.log(`SSR server started ${port} [${DateTime.local().toFormat('HH:mm:ss')}]`);
});