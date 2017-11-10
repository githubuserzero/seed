import { InitialState, InitialStateStore, intlStore, UserInfoStore } from 'app/data';
import * as express from 'express';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { App } from '../components';
import * as templates from '../templates';

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
  
  // render with styled-components
  const sheet: ServerStyleSheet = new ServerStyleSheet;
  const body: string = renderToString(sheet.collectStyles((
    <Provider userInfo={userInfo}
              intl={intlStore}
              initialState={new InitialStateStore(initialState)}>
      <App url={req.url}/>
    </Provider>
  )));
  
  // styled-components
  const styleTags: string = sheet.getStyleTags();
  
  return templates.app({
    body,
    initialState: JSON.stringify(initialState),
    styleTags,
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