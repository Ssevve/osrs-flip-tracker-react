import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import image from '../../coins.png';

import './Header.scss';


function Header() {
  return (
    <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            <img className="header__logo-image" src={image} alt="" />
            <h1 className="header__logo-text">OSRS Flip Tracker</h1>
          </Link>
          <nav className="nav">
            <ul className="nav__desktop-menu">
              <li className="nav__desktop-item">
                <NavLink className="nav__desktop-link" activeClassName="nav__desktop-link--active" exact to="/">Active offers</NavLink>
              </li>
              <li className="nav__desktop-item">
                <NavLink className="nav__desktop-link" activeClassName="nav__desktop-link--active" to="/history">History</NavLink>
              </li>
              <li className="nav__desktop-item">
                <NavLink className="nav__desktop-link" activeClassName="nav__desktop-link--active" to="/signup">Signup</NavLink>
              </li>
              <li className="nav__desktop-item">
                <NavLink className="nav__desktop-link" activeClassName="nav__desktop-link--active" to="/login">Login</NavLink>
              </li>
            </ul>
          </nav>
        </div>
			</header>
  )
}

export default Header;