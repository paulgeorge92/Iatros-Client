import React from 'react';
import { Switch, Route } from 'react-router-dom';

let PublicRoutes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <h3>Public Home</h3>
        </Route>

        <Route exact path="/links">
          <h3>Public link</h3>
        </Route>
      </Switch>
    </div>
  );
};
export default PublicRoutes;
