import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AdminLogin } from '../../Pages/Admin/Login';
import AdminRoutes from './AdminRoutes';

export const IatrosRouter = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/login`} component={AdminLogin}></Route>
      <Route path={path} component={AdminRoutes}></Route>
    </Switch>
  );
};
