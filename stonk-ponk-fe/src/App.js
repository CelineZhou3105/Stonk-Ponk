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
import Settings from './components/Settings';
import Education from './components/education/Education';
import WhatIsTheStockMarket from './components/education/WhatIsTheStockMarket';
import InterpretingTheNews from './components/education/InterpretingTheNews';
import WhyInvest from './components/education/WhyInvest';
import FinancialInstruments from './components/education/FinancialInstruments';
import StatisticsAndGraphs from './components/education/StatisticsAndGraphs';
import PassiveVSActive from './components/education/PassiveVSActive';
import StockDetails from './components/StockDetails';

import Portfolio from './components/Portfolio';

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
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/portfolio' component={Portfolio} />

          {/*Education pages*/}
          <Route exact path='/education' component={Education} />
          <Route exact path='/education/what-is-the-stock-market' component={WhatIsTheStockMarket} />
          <Route exact path='/education/interpreting-the-news-page' component={InterpretingTheNews} />
          <Route exact path='/education/why-invest' component={WhyInvest} />
          <Route exact path='/education/financial-instruments-101' component={FinancialInstruments} />
          <Route exact path='/education/statistics-and-graphs-101' component={StatisticsAndGraphs} />
          <Route exact path='/education/passive-vs-active-investing' component={PassiveVSActive} />
          <Route path='/stocks/:id' component={StockDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
