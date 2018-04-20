import { Provider } from 'app/context';
import { InitialState, User } from 'app/data';
import { Language } from 'common/data';
import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import * as templates from 'server/templates';
import { App } from '../components';

const router: express.Router = express.Router();

function render(req: express.Request, contentsState: Partial<InitialState>): string {
  // create state
  const language: Language = req.cookies.locale || 'en';
  const user: User = {firstName: 'Seoyeon', lastName: 'Lee', age: 38};
  const initialState: InitialState = Object.assign({
    message: {
      language,
    },
    user: {
      user,
    },
  }, contentsState);
  
  const body: string = renderToString((
    <Provider initialState={initialState}>
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