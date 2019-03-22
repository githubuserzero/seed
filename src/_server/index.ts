import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import moment from 'moment-timezone';

const port: number = Number(process.env.PORT || process.env.SERVER_PORT || 4100);

const app: Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', require('app/pages/main/requestHandler').requestHandler);
app.get('/translation-sample', require('app/pages/translation-sample/requestHandler').requestHandler);
app.get('/timezone-sample', require('app/pages/timezone-sample/requestHandler').requestHandler);
app.get('/showcase', require('showcase/requestHandler').requestHandler);
app.get('/showcase/*', require('showcase/requestHandler').requestHandler);

app.listen(port, () => {
  console.log(`SSR server started ${port} [${moment().format('HH:mm:ss')}]`);
});