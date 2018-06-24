import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import { unfetchExpense, logoutUser } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { retracted: false };
  }

  componentDidMount() {
    if (window.innerWidth < 620) {
      this.setState({ retracted: true });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 620) {
        this.setState({ retracted: true });
      } else {
        this.setState({ retracted: false });
      }
    });

    $(document).ready(() => {
      $('.dropdown-trigger').dropdown();
    });
  }

  renderMenu() {
    const { unfetchExpense, logoutUser, history } = this.props;

    // Dropdown menu for smaller screens
    if (this.state.retracted) {
      return (
        <div className="right">
          <a className="dropdown-trigger header-item" href="#" data-activates="dropdown1">
            Menu
          </a>
          {/* Dropdown Menu */}
          <ul id="dropdown1" className="dropdown dropdown-content">
            <li><Link to="/vacations">Vacations</Link></li>
            <li className="divider" tabIndex="-1"></li>
            <li><Link
              to="/expense"
              onClick={() => unfetchExpense()}
            >
              New Expense
            </Link></li>
            <li className="divider" tabIndex="-1"></li>
          </ul>
        </div>
      );
    }

    // Regular header
    return (
      <div className="right">
        <Link to="/vacations" className="header-item">Vacations</Link>
        <Link 
          to="/expense" 
          className="header-item"
          onClick={() => unfetchExpense()}
        >
          New Expense
        </Link>
        <a 
          className="header-item" 
          href="#" 
          onClick={() => logoutUser(history)}
        >
          Logout
        </a>
      </div>
    );
  }

  renderLoggedOut() {
    if (!this.props.user) {
      return (
        <div className="right">
          <Link to="/login" className="header-item">
            Login
          </Link>
        </div>
      );
    }

    return this.renderMenu();
  }

  render() {
    return (
      <div className="header">
        <div className="container">
          <Link to="/" className="header-title">Plany</Link>
          {this.renderLoggedOut()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user.currentUser };
};

export default connect(mapStateToProps, { unfetchExpense, logoutUser })(withRouter(Header));
