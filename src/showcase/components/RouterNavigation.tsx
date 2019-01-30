import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export function RouterNavigation() {
  return (
    <Fragment>
      <Link to="/showcase">Home</Link>
      <Link to="/showcase/sample">Samle</Link>
    </Fragment>
  );
}