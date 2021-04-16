import './App.css';

import {
  Route,
  Router,
  // BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { history } from './helpers/history';

import Login from './components/Login';
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
import Watchlist from './components/Watchlist';

import Portfolio from './components/Portfolio';

import News from './components/News';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  // Check whether the user is logged in
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={Signup} />
          <Route exact path="/sign-up-success" component={SignupSuccess} />
          <Route exact path="/forgot-password" component={PasswordReset} />
          <PrivateRoute exact path="/market" component={Market} />
          <PrivateRoute path='/stocks/:id' component={StockDetails} />
          <PrivateRoute exact path='/settings' component={Settings} />
          <PrivateRoute exact path='/portfolio' component={Portfolio} />
          <PrivateRoute exact path='/news' component={News} />
          <PrivateRoute exact path='/watchlist' component={Watchlist} />

          {/*Education pages*/}
          <PrivateRoute exact path='/education' component={Education} />
          <PrivateRoute exact path='/education/what-is-the-stock-market' component={WhatIsTheStockMarket} />
          <PrivateRoute exact path='/education/interpreting-the-news-page' component={InterpretingTheNews} />
          <PrivateRoute exact path='/education/why-invest' component={WhyInvest} />
          <PrivateRoute exact path='/education/financial-instruments-101' component={FinancialInstruments} />
          <PrivateRoute exact path='/education/statistics-and-graphs-101' component={StatisticsAndGraphs} />
          <PrivateRoute exact path='/education/passive-vs-active-investing' component={PassiveVSActive} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
