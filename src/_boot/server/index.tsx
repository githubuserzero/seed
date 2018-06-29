import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { DateTime } from 'luxon';
import * as React from 'react';
import * as routers from 'server/routers';
import * as config from '../../../config.json';

const app: express.Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routers.app);
app.use(routers.showcase);

const port: number = process.env.PORT || config.server.port;

app.listen(port, () => {
  console.log(`SSR server started ${port} [${DateTime.local().toFormat('HH:mm:ss')}]`);
});