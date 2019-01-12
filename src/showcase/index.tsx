import React from 'react';
import { RouterContents } from './components/RouterContents';
import { RouterNavigation } from './components/RouterNavigation';

export function Showcase() {
  return (
    <div>
      <RouterNavigation/>
      <RouterContents/>
    </div>
  );
}