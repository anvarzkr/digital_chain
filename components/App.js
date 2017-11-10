
import React, { Component } from 'react'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import Offers from './Offers'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class App extends Component{

  render(){
    return (
      <Router history={browserHistory}>
        <Route path='/' component={FirstPage} />
        <Route path='/offers' component={Offers} />
        <Route path='/company' component={SecondPage} />
      </Router>
    );
  }
}
export default App
