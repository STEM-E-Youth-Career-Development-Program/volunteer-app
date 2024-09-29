import React from 'react';
import './resources.css';  // Assuming the same CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faFile, faHouse, faCalendarDays, faMobile, faGlobe, faMagnifyingGlass, faUsers, faMap, faChalkboardUser, faGamepad, faRobot, faHashtag, faInfo, faPhone, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faYoutube, faDiscord, faTiktok, faLinkedinIn, faFlickr, faSpotify } from '@fortawesome/free-brands-svg-icons';

const NavBar = () => {
  return (
    <div className="nav-bar" id="nav-bar">
      <div className="logo">
        <img src="steme-logo.webp" alt="STEM-E Logo" />
      </div>
      <div className="menu">
        <span className="menu-item">Home</span>
        <span className="menu-item">Resources</span>
      </div>
      <div className="account">
        <FontAwesomeIcon icon={faCircleUser} size="4x" />
      </div>
    </div>
  );
};

const MainMenu = () => {
  return (
    <div className="main-menu">
      <h4>Topics</h4>
      <h5><FontAwesomeIcon icon={faFile} /> General</h5>
      <ul>
        <li><FontAwesomeIcon icon={faHouse} /> The STEME Experience</li>
        <li><a href="https://docs.google.com/spreadsheets/d/1kD-nnEYOemDGeAIEYRZbJ56RgxdV-SYAes-WGX9EviY/edit?gid=0#gid=0" target="_blank"><FontAwesomeIcon icon={faCalendarDays} /> Time Sheets</a></li>
      </ul>
      <h5><FontAwesomeIcon icon={faMobile} /> STEME Apps</h5>
      <ul>
        <li><a href="https://www.steme.org/" target="_blank"><FontAwesomeIcon icon={faGlobe} /> Website</a></li>
        <li><FontAwesomeIcon icon={faMagnifyingGlass} /> Career App</li>
        <li><FontAwesomeIcon icon={faUsers} /> Member App</li>
        <li><FontAwesomeIcon icon={faMap} /> Map App</li>
        <li><FontAwesomeIcon icon={faChalkboardUser} /> Tutor App</li>
        <li><FontAwesomeIcon icon={faGamepad} /> Game App</li>
        <li><FontAwesomeIcon icon={faRobot} /> Note Sage App</li>
      </ul>
      <h5><FontAwesomeIcon icon={faHashtag} /> STEME Social Media</h5>
      <ul>
        <li><a href="https://www.facebook.com/STEMEYouthCareerDevelopmentProgram/" target="_blank"><FontAwesomeIcon icon={faFacebookF} /> Facebook</a></li>
        <li><a href="https://www.instagram.com/steme.ycdp/" target="_blank"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
        <li><a href="https://x.com/steme_ycdp" target="_blank"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
        <li><a href="https://www.youtube.com/@stem-e" target="_blank"><FontAwesomeIcon icon={faYoutube} /> YouTube</a></li>
        <li><a href="https://discord.gg/R9NKY7rjTj" target="_blank"><FontAwesomeIcon icon={faDiscord} /> Discord</a></li>
        <li><a href="https://www.tiktok.com/@stem_e" target="_blank"><FontAwesomeIcon icon={faTiktok} /> Tiktok</a></li>
        <li><a href="https://www.linkedin.com/company/steme-youth-career-development-program/mycompany/" target="_blank"><FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn</a></li>
        <li><a href="https://www.flickr.com/photos/steme-ycdp/" target="_blank"><FontAwesomeIcon icon={faFlickr} /> Flickr</a></li>
        <li><a href="https://open.spotify.com/show/3ScxdUY1xh4FtApzh8NqOc" target="_blank"><FontAwesomeIcon icon={faSpotify} /> Spotify</a></li>
      </ul>
      <h5><FontAwesomeIcon icon={faListUl} /> Others</h5>
      <ul>
        <li><FontAwesomeIcon icon={faInfo} /> FAQs</li>
        <li><FontAwesomeIcon icon={faPhone} /> Contact Us</li>
        <li><FontAwesomeIcon icon={faSquarePollVertical} /> Surveys & Nominations</li>
      </ul>
    </div>
  );
};

const SubMenu = () => {
  return (
    <div className="sub-menu">
      <h5>General</h5>
      <span>About STEME</span>
      <span>Mission and Vision</span>
      <span>Values</span>
      <span>PVSA</span>
      <span>Internship Benefits</span>
      <span>Internship Roles</span>
      <span>Internship Requirements</span>
      <span>Team Meetings</span>
      <span>Switching Roles</span>
      <span>Whenisgood?</span>
      <span>Letters and Certificates</span>
      <span>Logging Hours</span>
    </div>
  );
};

const Resources = () => {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <MainMenu />
        <SubMenu />
      </div>
    </div>
  );
};

export default Resources;