import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Login from './login-page/Login';
import Summary from './summary-page/Summary';
import Signup from './signup-page/SignUp';
import SignupSuccess from './signup-page/SignUpSuccess';
import PasswordReset from './forgot-password/PasswordReset';
import Settings from './settings-page/Settings';
import Education from './education/Education';
import WhatIsTheStockMarket from './education/WhatIsTheStockMarket';
import InterpretingTheNews from './education/InterpretingTheNews';
import WhyInvest from './education/WhyInvest';
import FinancialInstruments from './education/FinancialInstruments';
import StatisticsAndGraphs from './education/StatisticsAndGraphs';
import PassiveVSActive from './education/PassiveVSActive';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Summary} />
          <Route exact path="/sign-up" component={Signup} />
          <Route exact path="/sign-up-success" component={SignupSuccess} />
          <Route exact path="/forgot-password" component={PasswordReset} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/education' component={Education} />
          <Route exact path='/education/what-is-the-stock-market' component={WhatIsTheStockMarket} />
          <Route exact path='/education/interpreting-the-news-page' component={InterpretingTheNews} />
          <Route exact path='/education/why-invest' component={WhyInvest} />
          <Route exact path='/education/financial-instruments-101' component={FinancialInstruments} />
          <Route exact path='/education/statistics-and-graphs-101' component={StatisticsAndGraphs} />
          <Route exact path='/education/passive-vs-active-investing' component={PassiveVSActive} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
