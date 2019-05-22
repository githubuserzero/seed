import React from 'react';
import './app.scss';
import { LanguageChangeButton } from './components/LanguageChangeButton';
import { TimezoneChangeSelect } from './components/TimezoneChangeSelect';
import { RouterContents } from './router-components/RouterContents';
import { RouterNavigation } from './router-components/RouterNavigation';

export function App() {
  return (
    <>
      <div className="header">
        <RouterNavigation/>
        <div className="header-space"/>
        <LanguageChangeButton/>
        <TimezoneChangeSelect/>
      </div>
      <div className="body">
        <RouterContents/>
      </div>
    </>
  );
}