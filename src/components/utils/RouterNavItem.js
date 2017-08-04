import React from "react";
import { Route, Link } from "react-router-dom";

export default ({exact, strict, to, children}) => (
  <Route exact={exact} strict={strict} path={to} children={({match}) => (
    <li role="presentation" className={match ? 'active' : ''}>
      <Link to={to} onClick={e => e.target.blur()}>{children}</Link>
    </li>
  )} />
);
