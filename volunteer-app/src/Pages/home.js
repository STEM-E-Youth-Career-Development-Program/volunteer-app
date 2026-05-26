import React, { useState } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faHouse, faCalendarDays, faMobile, faGlobe, faMagnifyingGlass, faUsers, faMap, faChalkboardUser, faGamepad, faRobot, faHashtag, faInfo, faPhone, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faYoutube, faDiscord, faTiktok, faLinkedinIn, faFlickr, faSpotify } from '@fortawesome/free-brands-svg-icons';
import NavBarAdmin from './navBarAdmin';

const carouselItems = [
    {
        title: "What's going on at STEM-E?",
        points: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5']
    },
    {
        title: 'Attend TownHall',
        points: []
    },
    {
        title: 'STEM-E In-Person Events',
        points: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5']
    },
    {
        title: 'Feedback process at STEM-E',
        points: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5']
    },
    {
        title: 'Have you signed-up for PVSA?',
        points: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5']
    }
];

const Updates = ({ title, points }) => (
    <article className="carousel-card">
        <h2>{title}</h2>
        {points.length > 0 ? (
            <ol>
                {points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ol>
        ) : (
            <p className="empty-state">Coming soon — stay tuned for the next update.</p>
        )}
    </article>
);

const QuickLinksSection = () => (
    <section className="quicklinks-block reveal-card">
        <div className="section-title-row">
            <h4>Quick Links</h4>
        </div>
        <div className="quicklinks-grid">
            <div className="link-group">
                <h5><FontAwesomeIcon icon={faFile} /> Intern Documents</h5>
                <ul>
                    <li><FontAwesomeIcon icon={faHouse} /> The STEME Experience</li>
                    <li><a href="https://docs.google.com/spreadsheets/d/1kD-nnEYOemDGeAIEYRZbJ56RgxdV-SYAes-WGX9EviY/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCalendarDays} /> Time Sheets</a></li>
                </ul>
            </div>
            <div className="link-group">
                <h5><FontAwesomeIcon icon={faMobile} /> STEME Apps</h5>
                <ul>
                    <li><a href="https://www.steme.org/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGlobe} /> Website</a></li>
                    <li><a href="/samplepage"><FontAwesomeIcon icon={faMagnifyingGlass} /> Career App</a></li>
                    <li><a href="/samplepage"><FontAwesomeIcon icon={faUsers} /> Member App</a></li>
                    <li><a href="/samplepage"><FontAwesomeIcon icon={faMap} /> Map App</a></li>
                    <li><a href="/samplepage"><FontAwesomeIcon icon={faChalkboardUser} /> Tutor App</a></li>
                    <li><a href="/samplepage"><FontAwesomeIcon icon={faGamepad} /> Game App</a></li>
                    <li><a href="/samplepage"><FontAwesomeIcon icon={faRobot} /> Note Sage App</a></li>
                </ul>
            </div>
            <div className="link-group">
                <h5><FontAwesomeIcon icon={faHashtag} /> STEM-E Social Media</h5>
                <ul>
                    <li><a href="https://www.facebook.com/STEMEYouthCareerDevelopmentProgram/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /> Facebook</a></li>
                    <li><a href="https://www.instagram.com/steme.ycdp/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
                    <li><a href="https://x.com/steme_ycdp" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
                    <li><a href="https://www.youtube.com/@stem-e" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /> YouTube</a></li>
                    <li><a href="https://discord.gg/R9NKY7rjTj" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faDiscord} /> Discord</a></li>
                    <li><a href="https://www.tiktok.com/@stem_e" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} /> TikTok</a></li>
                    <li><a href="https://www.linkedin.com/company/steme-youth-career-development-program/mycompany/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn</a></li>
                    <li><a href="https://www.flickr.com/photos/steme-ycdp/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFlickr} /> Flickr</a></li>
                    <li><a href="https://open.spotify.com/show/3ScxdUY1xh4FtApzh8NqOc" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faSpotify} /> Spotify</a></li>
                </ul>
            </div>
        </div>
    </section>
);

const FooterSection = () => (
    <section className="footer-section reveal-card">
        <div className="footer-main">
            <div className="footer-support">
                <h4>Need help?</h4>
                <ul>
                    <li><FontAwesomeIcon icon={faInfo} /> <a href="#">FAQ</a></li>
                    <li><FontAwesomeIcon icon={faPhone} /> <a href="#">Contact Us</a></li>
                </ul>
            </div>
            <div className="footer-extra">
                <h4>Other links</h4>
                <ul>
                    <li><FontAwesomeIcon icon={faInfo} /> Surveys & Nominations</li>
                    <li><FontAwesomeIcon icon={faInfo} /> Account</li>
                    <li><FontAwesomeIcon icon={faInfo} /> Support</li>
                </ul>
            </div>
        </div>
    </section>
);

const HeroSection = () => (
    <section className="hero-section reveal-hero">
        <div className="hero-graphic-wrapper">
            <img
                src="https://static.wixstatic.com/media/8c1082_500d66cd227a4dfab9a7361dcbbabadb~mv2.png/v1/fit/w_2500,h_1330,al_c/8c1082_500d66cd227a4dfab9a7361dcbbabadb~mv2.png"
                alt="STEM-E logo"
                className="hero-logo"
            />
        </div>
    </section>
);

const CarouselSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = carouselItems.length;
    const visibleItems = [0, 1, 2].map((position) => carouselItems[(currentIndex + position) % length]);

    return (
        <section className="carousel-section reveal-card" id="main-content">
            <div className="section-title-row">
                <h4>Latest updates</h4>
                <div className="carousel-controls">
                    <button className="carousel-control" onClick={() => setCurrentIndex((currentIndex - 1 + length) % length)} aria-label="Previous">
                        &lt;
                    </button>
                    <button className="carousel-control" onClick={() => setCurrentIndex((currentIndex + 1) % length)} aria-label="Next">
                        &gt;
                    </button>
                </div>
            </div>
            <div className="carousel-track">
                {visibleItems.map((item) => (
                    <Updates key={item.title} title={item.title} points={item.points} />
                ))}
            </div>
        </section>
    );
};

const Home = () => (
    <div className="home-page">
        <NavBarAdmin />
        <HeroSection />
        <CarouselSection />
        <QuickLinksSection />
        <FooterSection />
    </div>
);

export default Home;
