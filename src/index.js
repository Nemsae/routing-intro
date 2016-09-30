import React from 'react'
import { render } from 'react-dom'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'
import StockInput from './components/StockInput'
import StockPortfolio from './components/StockPortfolio'
import Welcome from './components/Welcome'

render(
  <Router history={browserHistory}>

    <Route path='/' component={Layout}>

      {/* <IndexRoute component={Welcome}></IndexRoute> */}
      <Route path='/welcome' component={Welcome}></Route>
      <Route path='/stockinput' component={StockInput}></Route>
      <Route path='/stockportfolio' component={StockPortfolio}></Route>
    </Route>

  </Router>,

  document.getElementById('root')
);
