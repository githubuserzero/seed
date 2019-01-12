import React from 'react';
import { Link } from 'react-router-dom';

export function RouterNavigation() {
  return (
    <React.Fragment>
      <Link to="/">Home</Link>
      <Link to="/sample">Sample</Link>
    </React.Fragment>
  );
}