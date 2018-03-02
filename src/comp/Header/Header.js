import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Switch, Route } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <ul className="Menu">
          <li className="Logo">Logo</li>
          <li className="Title">Title</li>
          <li className="MenuItem"><Link to="/Marketplace">Marketplace</Link></li>
          <li className="MenuItem"><Link to="/">Profile</Link></li>
        </ul>
      </div>
    )
  }
}

export default Header
