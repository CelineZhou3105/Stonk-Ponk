import logo from './logo.svg';
import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Navigation from './navigation/Navigation';
import Login from './login-page/Login';
import Summary from './summary-page/Summary';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/home" component={Summary}/>
          </Switch>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
