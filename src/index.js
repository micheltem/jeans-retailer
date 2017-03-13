import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/filter/:filter" component={App}>
      <Route path="/filter/:filter/and/:filter2" component={App}/>
    </Route>
  </Router>
), document.getElementById('root'))
