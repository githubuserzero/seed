import React from 'react';
import { NavLink } from 'react-router-dom';

export function RouterNavigation() {
  return (
    <>
      <NavLink to="/" exact>
        HOME
      </NavLink>
      <NavLink to="/translation-sample">
        TRANSLATION
      </NavLink>
      <NavLink to="/timezone-sample">
        TIMEZONE
      </NavLink>
    </>
  );
}