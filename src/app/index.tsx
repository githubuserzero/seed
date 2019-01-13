import React from 'react';
import { RouterStore } from 'router-store';
import { LanguageChangeButton } from './components/LanguageChangeButton';
import { RouterContents } from './components/RouterContents';
import { RouterNavigation } from './components/RouterNavigation';
import { TimezoneChangeSelect } from './components/TimezoneChangeSelect';

export interface AppProps {
  routerStore: RouterStore;
}

export function App({routerStore}: AppProps) {
  return (
    <React.Fragment>
      <div>
        <LanguageChangeButton/>
        <TimezoneChangeSelect/>
      </div>
      <div>
        <RouterNavigation/>
      </div>
      <div>
        <RouterContents routerStore={routerStore}/>
      </div>
    </React.Fragment>
  );
}