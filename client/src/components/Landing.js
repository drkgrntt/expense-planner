import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IndexExpenses from './IndexExpenses';

class Landing extends Component {
  renderLandingPage() {
    if (this.props.user) {
      return <IndexExpenses />
    }

    return (
      <div className="card-panel list">
        <h2>Welcome to Plany!</h2>
        <h5>Your vacation expense planner</h5>
        <hr />
        <Link className="btn" to="/login">Get started</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="landing">
        {this.renderLandingPage()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user.currentUser };
};

export default connect(mapStateToProps)(Landing);
