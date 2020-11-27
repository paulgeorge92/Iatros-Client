import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import ErrorPage404 from '../../Pages/Error/404';

let PublicRoutes = () => {
  const history = useHistory();
  if (document.location.pathname === '/') {
    history.push('/admin');
  }
  return (
    <div>
      <Switch>
        <Route exact path="/"></Route>
        <Route>
          <ErrorPage404 homeUrl="/" />
        </Route>
      </Switch>
    </div>
  );
};
export default PublicRoutes;
