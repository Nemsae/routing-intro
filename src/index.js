import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory } from 'react-router'

import Layout from './components/Layout'
import StockInput from './components/StockInput'
import StockPortfolio from './components/StockPortfolio'
import Welcome from './components/Welcome'

render(
  <Router history={browserHistory}>

    <Route path='/routing-intro/' component={Layout}>

      <Route path='/routing-intro/welcome' component={Welcome}></Route>
      <Route path='/routing-intro/stockinput' component={StockInput}></Route>
      <Route path='/routing-intro/stockportfolio' component={StockPortfolio}></Route>
    </Route>

  </Router>,

  document.getElementById('root')
);
