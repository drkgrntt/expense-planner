import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import { unfetchExpense } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { retracted: false };
  }

  componentDidMount() {
    if (window.innerWidth < 600) {
      this.setState({ retracted: true });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 600) {
        return this.setState({ retracted: true });
      }

      return this.setState({ retracted: false });
    });
  }

  renderMenu() {
    if (this.state.retracted) {
      return <Dropdown />;
    }

    return (
      <div className="right">
        <Link to="/collections" className="header-item option">Collections</Link>
        <Link 
          to="/expense" 
          className="header-item option"
          onClick={() => this.props.unfetchExpense()}
        >
          New Expense
        </Link>
        <Link to="/" className="header-item option">Home</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <h1 className="header-title">Expense Planner</h1>
        {this.renderMenu()}
      </div>
    );
  }
}

export default connect(null, { unfetchExpense })(Header);
