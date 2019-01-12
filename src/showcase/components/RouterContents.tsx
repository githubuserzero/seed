import React from 'react';
import { Route } from 'react-router-dom';

export function RouterContents() {
  return (
    <React.Fragment>
      <Route exact path="/showcase" component={require('showcase/router-components/main').default}/>
      <Route path="/showcase/sample" component={require('showcase/router-components/sample').default}/>
    </React.Fragment>
  );
}