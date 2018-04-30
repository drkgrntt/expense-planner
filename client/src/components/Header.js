import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import { unfetchReceipt } from '../actions';

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
          to="/receipt" 
          className="header-item option"
          onClick={() => this.props.unfetchReceipt()}
        >
          New Receipt
        </Link>
        <Link to="/" className="header-item option">Home</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <img 
          src="http://www.riskgenius.com/wp-content/uploads/2017/12/RGlogo-2018_200h_web.png"
          className="header-item"
          alt="risk genius logo"
        />
        {this.renderMenu()}
      </div>
    );
  }
}

export default connect(null, { unfetchReceipt })(Header);
