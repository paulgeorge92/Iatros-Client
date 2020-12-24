import React, { useReducer } from 'react';
import './App.less';
import { AdminContext } from './contexts/AdminContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IatrosRouter } from './routes/Admin/AdminRouter';
import PublicRoutes from './routes/Public/PublicRoutes';
import { AdminPath, ContextActions } from './constants';
import ErrorPage404 from './Pages/Error/404';
import { AppContext, ContextDispatch } from './models/Context';
import { UserContext } from './contexts/UserContext';
import { APP_SETTINGS } from './constants/AppSettings';

function reducer(state: AppContext, action: ContextDispatch): AppContext {
  switch (action.type) {
    case ContextActions.LOGIN_USER:
      return { ...state, currentUser: action.value };
    case ContextActions.LOGOUT_USER:
      return { ...state, currentUser: {} };
    case ContextActions.SETTINGS_UPDATE:
      return { ...state, settings: action.value };
    default:
      return { ...state };
  }
}
const initialContext: AppContext = { currentUser: {}, settings: APP_SETTINGS };
const App = () => {
  const [adminContext, dispatchAdmin] = useReducer(reducer, initialContext);
  const [userContext, dispatchUser] = useReducer(reducer, initialContext);
  return (
    <div className="iatros-app">
      <Router>
        <Switch>
          <Route path={AdminPath}>
            <AdminContext.Provider value={{ context: adminContext, dispatch: dispatchAdmin }}>
              <IatrosRouter />
            </AdminContext.Provider>
          </Route>
          <Route path="/">
            <UserContext.Provider value={{ context: userContext, dispatch: dispatchUser }}>
              <PublicRoutes />
            </UserContext.Provider>
          </Route>
          <Route>
            <ErrorPage404 homeUrl="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
