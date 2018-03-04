import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Switch, Route } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <ul className="Menu">
          <li className="Logo"><img src={"Images/logo.png"}/></li>
          <li className="Title">BlueChain</li>
          <Link to="/Marketplace"><li className="MenuItem">Marketplace</li></Link>
          <Link to="/Scan"><li className="MenuItem">Scan</li></Link>
          <Link to="/Post"><li className="MenuItem">Post Ad</li></Link>
          <Link to="/"><li className="MenuItem">Profile</li></Link>

        </ul>
      </div>
    )
  }
}

export default Header
