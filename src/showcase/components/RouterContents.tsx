import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

export function RouterContents() {
  return (
    <Fragment>
      <Route exact path="/showcase" component={require('showcase/router-components/main').default}/>
      <Route path="/showcase/sample" component={require('showcase/router-components/sample').default}/>
    </Fragment>
  );
}