import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import NewExpense from './NewExpense';
import IndexVacations from './IndexVacations';
import ShowVacation from './ShowVacation';
import Authenticate from './Authenticate';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <div className="container routes">
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Authenticate} />
            <Route exact path="/expense" component={NewExpense} />
            <Route exact path="/vacations" component={IndexVacations} />
            <Route exact path="/vacations/:id" component={ShowVacation} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
