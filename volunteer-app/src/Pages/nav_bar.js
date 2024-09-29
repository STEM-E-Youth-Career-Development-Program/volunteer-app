import React from 'react';
import './nav_bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <div className="nav-bar" id="nav-bar">
      <div className="logo">
        <img src="steme-logo.webp" alt="STEM-E Logo" />
      </div>
      <div className="title">Volunteer App</div>
      <div className="menu">
        <span className="menu-item">About STEM-E</span>
        <span className="menu-item">Contact Us</span>
      </div>
      <div className="account">
        <FontAwesomeIcon icon={faCircleUser} size="4x" />
      </div>
    </div>
  );
};

export default NavBar;