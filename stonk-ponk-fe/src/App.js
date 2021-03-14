import './App.css';

import {
  Route,
  Router,
  // BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { history } from './helpers/history';

import { PrivateRoute } from './login-page/PrivateRoute';

import Login from './login-page/Login';
import Summary from './summary-page/Summary';
import Signup from './signup-page/SignUp';
import SignupSuccess from './signup-page/SignUpSuccess';
import PasswordReset from './forgot-password/PasswordReset';

import { authentication } from './services/authentication';
import { useEffect } from 'react';

function App() {
  // Check whether the user is logged in
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home" component={Summary} />
          <Route exact path="/sign-up" component={Signup} />
          <Route exact path="/sign-up-success" component={SignupSuccess} />
          <Route exact path="/forgot-password" component={PasswordReset} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
