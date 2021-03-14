import './App.css';

import {
  Route,
  Router,
  // BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { history } from './helpers/history';

import { PrivateRoute } from './components/PrivateRoute';

import Login from './components/Login';
import Summary from './components/Summary';
import Signup from './components/SignUp';
import SignupSuccess from './components/SignUpSuccess';
import PasswordReset from './components/PasswordReset';
import Market from './components/Market';

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
          <Route exact path="/market" component={Market} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
