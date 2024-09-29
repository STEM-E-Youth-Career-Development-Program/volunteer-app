import React from 'react';
import './home.css'; // Ensure to keep your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faFile, faHouse, faCalendarDays, faMobile, faGlobe, faMagnifyingGlass, faUsers, faMap, faChalkboardUser, faGamepad, faRobot, faHashtag, faFacebookF, faInstagram, faTwitter, faYoutube, faDiscord, faTiktok, faLinkedinIn, faFlickr, faSpotify, faInfo, faPhone, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';

const data = {
    stemeUpdates: [
        "Point 1", "Point 2", "Point 3", "Point 4", "Point 5"
    ],
    events: [
        "Point 1", "Point 2", "Point 3", "Point 4", "Point 5"
    ],
    feedback: [
        "Point 1", "Point 2", "Point 3", "Point 4", "Point 5"
    ],
    pvsa: [
        "Point 1", "Point 2", "Point 3", "Point 4", "Point 5"
    ]
};

const NavBar = () => (
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

const Updates = ({ title, points }) => (
    <div className="update-section">
        <h2>{title}</h2>
        <ol>
            {points.map((point, index) => (
                <li key={index}>{point}</li>
            ))}
        </ol>
    </div>
);

const QuickLinks = () => (
    <div className="quick-links">
        <h4>Quick Links</h4>
        <h5><FontAwesomeIcon icon={faFile} /> Intern Documents</h5>
        <ul>
            <li><FontAwesomeIcon icon={faHouse} /> The STEME Experience</li>
            <li><a href="https://docs.google.com/spreadsheets/d/1kD-nnEYOemDGeAIEYRZbJ56RgxdV-SYAes-WGX9EviY/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCalendarDays} /> Time Sheets</a></li>
        </ul>
        <h5><FontAwesomeIcon icon={faMobile} /> STEME Apps</h5>
        <ul>
            <li><a href="https://www.steme.org/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGlobe} /> Website</a></li>
            <li><FontAwesomeIcon icon={faMagnifyingGlass} /> Career App</li>
            <li><FontAwesomeIcon icon={faUsers} /> Member App</li>
            <li><FontAwesomeIcon icon={faMap} /> Map App</li>
            <li><FontAwesomeIcon icon={faChalkboardUser} /> Tutor App</li>
            <li><FontAwesomeIcon icon={faGamepad} /> Game App</li>
            <li><FontAwesomeIcon icon={faRobot} /> Note Sage App</li>
        </ul>
        <h5><FontAwesomeIcon icon={faHashtag} /> STEME Social Media</h5>
        <ul>
            <li><a href="https://www.facebook.com/STEMEYouthCareerDevelopmentProgram/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /> Facebook</a></li>
            <li><a href="https://www.instagram.com/steme.ycdp/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
            <li><a href="https://x.com/steme_ycdp" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
            <li><a href="https://www.youtube.com/@stem-e" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /> YouTube</a></li>
            <li><a href="https://discord.gg/R9NKY7rjTj" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faDiscord} /> Discord</a></li>
            <li><a href="https://www.tiktok.com/@stem_e" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} /> Tiktok</a></li>
            <li><a href="https://www.linkedin.com/company/steme-youth-career-development-program/mycompany/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn</a></li>
            <li><a href="https://www.flickr.com/photos/steme-ycdp/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFlickr} /> Flickr</a></li>
            <li><a href="https://open.spotify.com/show/3ScxdUY1xh4FtApzh8NqOc" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faSpotify} /> Spotify</a></li>
        </ul>
        <h5><FontAwesomeIcon icon={faListUl} /> Others</h5>
        <ul>
            <li><FontAwesomeIcon icon={faInfo} /> FAQs</li>
            <li><FontAwesomeIcon icon={faPhone} /> Contact Us</li>
            <li><FontAwesomeIcon icon={faSquarePollVertical} /> Surveys & Nominations</li>
        </ul>
    </div>
);

const MainContent = () => (
    <div className="main-content">
        <div className="part1">
            <Updates title="What's going on at STEM-E?" points={data.stemeUpdates} />
            <Updates title="Attend TownHall" points={[]} />
            <Updates title="STEM-E In-Person Events" points={data.events} />
            <Updates title="Feedback process at STEM-E" points={data.feedback} />
            <Updates title="Have you signed-up for PVSA?" points={data.pvsa} />
        </div>
        <QuickLinks />
    </div>
);

const Home = () => (
    <div>
        <NavBar />
        <MainContent />
    </div>
);

export default Home;