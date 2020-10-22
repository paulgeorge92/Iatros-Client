import React from 'react';
import './App.less';
import { AdminContext } from './contexts/AdminContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IatrosRouter } from './routes/Admin/AdminRouter';
import PublicRoutes from './routes/Public/PublicRoutes';
import { AdminPath } from './constants';
import ErrorPage404 from './Pages/Error/404';

function App() {
  return (
    <div className="iatros-app">
      <Router>
        <Switch>
          <Route path={AdminPath}>
            <AdminContext.Provider value={{}}>
              <IatrosRouter></IatrosRouter>
            </AdminContext.Provider>
          </Route>
          <Route path="/" component={PublicRoutes}></Route>
          <Route>
            <ErrorPage404 homeUrl="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
