import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as React from 'react';
import * as config from '../../../config.json';
import * as routers from './routers';
import * as moment from 'moment';

const app: express.Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routers.app);
app.use(routers.showcase);

const port: number = process.env.PORT || config.server.port;

app.listen(port, () => {
  console.log(`SSR server started ${port} [${moment().format('HH:mm:ss')}]`);
});