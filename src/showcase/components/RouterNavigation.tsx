import React from 'react';
import { Link } from 'react-router-dom';

export function RouterNavigation() {
  return (
    <>
      <Link to="/showcase">Home</Link>
      <Link to="/showcase/sample">Samle</Link>
    </>
  );
}