import React from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendarDays, faGlobe, faMagnifyingGlass, faUsers, faChalkboardUser, faInfo, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';
import NavBarAdmin from './navBarAdmin';
const updateCards = [
    {
        title: "What's going on at STEM-E?",
        points: ['', '', '', '', '']
    },
    {
        title: 'Attend Townhall at STEM-E',
        copy: "Thank you for choosing to volunteer with STEM-E. We're excited to have you join our incredible community and can't wait to onboard you."
    },
    {
        title: 'STEM-E In-Person Events',
        copy: "Thank you for choosing to volunteer with STEM-E. We're excited to have you join our incredible community and can't wait to onboard you."
    },
    {
        title: 'Feedback Process at STEM-E',
        copy: "Thank you for choosing to volunteer with STEM-E. We're excited to have you join our incredible community and can't wait to onboard you."
    },
    {
        title: 'Have you signed up for PVSA?',
        copy: ''
    }
];

const quickLinkGroups = [
    {
        title: 'Intern Documents',
        items: [
            { icon: faHouse, label: 'The STEME Experience', href: '#' },
            { icon: faCalendarDays, label: 'Time Sheets', href: 'https://docs.google.com/spreadsheets/d/1kD-nnEYOemDGeAIEYRZbJ56RgxdV-SYAes-WGX9EviY/edit?gid=0#gid=0' },
        ],
    },
    {
        title: 'STEME Apps',
        items: [
            { icon: faGlobe, label: 'STEM-E Website', href: 'https://www.steme.org/' },
            { icon: faMagnifyingGlass, label: 'Career App', href: '/samplepage' },
            { icon: faUsers, label: 'Member App', href: '/samplepage' },
            { icon: faChalkboardUser, label: 'Tutor App', href: '/samplepage' },
        ],
    },
    {
        title: 'STEM-E Social',
        items: [
            { icon: faDiscord, label: 'Discord', href: 'https://discord.gg/R9NKY7rjTj', brand: true },
            { icon: faYoutube, label: 'Youtube', href: 'https://www.youtube.com/@stem-e', brand: true },
            { icon: faInstagram, label: 'Instagram', href: 'https://www.instagram.com/steme.ycdp/', brand: true },
            { icon: faFacebookF, label: 'Facebook', href: 'https://www.facebook.com/STEMEYouthCareerDevelopmentProgram/', brand: true },
        ],
    },
    {
        title: 'Others',
        items: [
            { icon: faInfo, label: 'Surveys and Nominations', href: '#' },
            { icon: faInfo, label: 'FAQs', href: '#' },
            { icon: faPhone, label: 'Contact Us', href: '/supportform' },
        ],
    },
];

const UpdatesCard = ({ title, points = [], copy }) => (
    <article className="content-card">
        <h2>{title}</h2>
        {points.length > 0 ? (
            <ol className="number-list">
                {points.map((point, index) => (
                    <li key={index}>
                        <span>{point}</span>
                    </li>
                ))}
            </ol>
        ) : (
            <p>{copy}</p>
        )}
    </article>
);

const Home = () => {
    return (
        <div className="home-page">
            <NavBarAdmin />

            <main className="home-layout">
                <section className="home-feed" id="main-content">
                    <UpdatesCard {...updateCards[0]} />

                    <div className="two-column-row">
                        <UpdatesCard {...updateCards[1]} />
                        <UpdatesCard {...updateCards[2]} />
                    </div>

                    <div className="two-column-row bottom-row">
                        <UpdatesCard {...updateCards[3]} />
                        <UpdatesCard {...updateCards[4]} />
                    </div>
                </section>

                <aside className="quick-links-panel" aria-label="Quick links">
                    <h3>Quick Links</h3>
                    <div className="link-stack">
                        {quickLinkGroups.map((group) => (
                            <section key={group.title} className="link-group">
                                <div className="link-group-title">
                                    <span>{group.title}</span>
                                </div>
                                <ul>
                                    {group.items.map((item) => (
                                        <li key={item.label}>
                                            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                                                <FontAwesomeIcon icon={item.icon} className={item.brand ? 'brand-icon' : ''} />
                                                <span>{item.label}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default Home;
