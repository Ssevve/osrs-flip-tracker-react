import React from 'react'

import image from '../../coins.png';

import './Header.scss';


function Header() {
  return (
    <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <img className="header__logo-image" src={image} alt="" />
            <h1 className="header__logo-text">OSRS Flip Tracker</h1>
          </div>
        </div>
			</header>
  )
}

export default Header;