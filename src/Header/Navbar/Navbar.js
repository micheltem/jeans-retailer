import React from 'react';
import logo from '../../logo.svg';
import UserIcon from '../UserIcon/UserIcon';
import './navbar-styles.css';

const Navbar = (props) => {
  return (
    <div className="navbar">
      <img src={logo}
        className="logo"
        alt="logo" />
      <h1>
        Jeans Retailer
        <small>Inc.</small>
      </h1>
      <UserIcon userName="Michel" />
    </div>
  );
}

export default Navbar;
