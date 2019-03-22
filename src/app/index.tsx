import React from 'react';
import { RouteStore } from 'react-router-store';
import { LanguageChangeButton } from './components/LanguageChangeButton';
import { RouterContents } from './components/RouterContents';
import { RouterNavigation } from './components/RouterNavigation';
import { TimezoneChangeSelect } from './components/TimezoneChangeSelect';
import './style.scss';

export interface AppProps {
  routeStore: RouteStore;
}

export function App({routeStore}: AppProps) {
  return (
    <>
      <div className="header">
        <RouterNavigation/>
        <div className="header-space"/>
        <LanguageChangeButton/>
        <TimezoneChangeSelect/>
      </div>
      <div className="body">
        <RouterContents routeStore={routeStore}/>
      </div>
    </>
  );
}