import React from 'react';
import { Route } from 'react-router-dom';

export function RouterContents() {
  return (
    <>
      <Route exact path="/showcase" component={require('showcase/pages/main').default}/>
      <Route path="/showcase/sample" component={require('showcase/pages/sample').default}/>
    </>
  );
}