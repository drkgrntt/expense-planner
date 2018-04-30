import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// DROPDOWN MENU
class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  renderMenu() {
    if (this.state.open) {
      return (
        <ul className="dropdown">
          <li><Link to="/" className="header-item option">Home</Link></li>
          <li><Link to="/receipt" className="header-item option">New Receipt</Link></li>
          <li><Link to="/collections" className="header-item option">Collections</Link></li>
          <li><Link
            to="#" 
            className="header-item option"
            onClick={() => this.setState({ open: false })}
          >
            Close Menu
          </Link></li>
        </ul>
      );
    }

    return (
      <Link
        className="header-item option"
        to="#"
        onClick={() => this.setState({ open: true })}
      >
        Menu
      </Link>
    );
  }

  render() {
    return (
      <div className="right">
        {this.renderMenu()}
      </div>
    );
  }
}

export default Dropdown;
