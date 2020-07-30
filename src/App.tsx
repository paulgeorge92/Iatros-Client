import React from 'react';
import './App.less';
import { AdminContext } from './contexts/AdminContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IatrosRouter } from './routes/Admin/AdminRouter';
import PublicRoutes from './routes/Public/PublicRoutes';
import { AdminPath } from './constants';

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
