import { Provider } from 'app/context';
import { cookieKeys } from 'app/data';
import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { InitialState, Language, User } from 'seed/data';
import * as templates from 'server/templates';
import { App } from '../components';

const router: express.Router = express.Router();

function render(req: express.Request, contentsState: Partial<InitialState>): string {
  // create state
  const language: Language = req.cookies[cookieKeys.locale] || 'en';
  const user: User = {firstName: 'Seoyeon', lastName: 'Lee', age: 38};
  const timezone: string = req.cookies[cookieKeys.timezone] || 'Asia/Seoul';
  
  const initialState: InitialState = Object.assign({
    language,
    user,
  }, contentsState);
  
  const body: string = renderToString((
    <Provider initialState={initialState} currentTimezone={timezone}>
      <App url={req.url}/>
    </Provider>
  ));
  
  return templates.app({
    body,
    initialState: JSON.stringify(initialState),
  });
}

router.get('/', (req, res) => {
  res.send(render(req, {}));
});

router.get('/sample', (req, res) => {
  res.send(render(req, {
    sample: {
      testString: 'Server Initial Value',
    },
  }));
});

export default router;