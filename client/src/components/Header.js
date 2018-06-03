import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import { unfetchExpense } from '../actions';

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
    // Dropdown menu for smaller screens
    if (this.state.retracted) {
      return (
        <div className="right">
          <a className="dropdown-trigger header-item" href="#" data-activates="dropdown1">
            Menu
          </a>
          {/* Dropdown Menu */}
          <ul id="dropdown1" className="dropdown dropdown-content">
            <li><Link to="/collections">Collections</Link></li>
            <li className="divider" tabIndex="-1"></li>
            <li><Link
              to="/expense"
              onClick={() => this.props.unfetchExpense()}
            >
              New Expense
            </Link></li>
            <li className="divider" tabIndex="-1"></li>
            <li><Link to="/">Home</Link></li>
          </ul>
        </div>
      );
    }

    // Regular header
    return (
      <div className="right">
        <Link to="/collections" className="header-item">Collections</Link>
        <Link 
          to="/expense" 
          className="header-item"
          onClick={() => this.props.unfetchExpense()}
        >
          New Expense
        </Link>
        <Link to="/" className="header-item">Home</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <h1 className="header-title">Vacation Expense Planner</h1>
        {this.renderMenu()}
      </div>
    );
  }
}

export default connect(null, { unfetchExpense })(Header);
