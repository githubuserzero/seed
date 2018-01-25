import { InitialState, InitialStateStore, UserInfoStore } from 'app/data';
import { intlStore } from 'common/data';
import * as templates from 'common/templates';
import * as express from 'express';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../components';

const router: express.Router = express.Router();

function render(req: express.Request, contentsState: Partial<InitialState>): string {
  // create stores
  intlStore.updateLanguage(req.cookies.locale || 'en');
  
  const userInfo: UserInfoStore = new UserInfoStore;
  userInfo.updateUser({firstName: 'Seoyeon', lastName: 'Lee', age: 38});
  
  // create state
  const initialState: InitialState = Object.assign({
    intl: {
      language: intlStore.language,
    },
    userInfo: {
      user: userInfo.user,
    },
  }, contentsState);
  
  const body: string = renderToString((
    <Provider userInfo={userInfo}
              intl={intlStore}
              initialState={new InitialStateStore(initialState)}>
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