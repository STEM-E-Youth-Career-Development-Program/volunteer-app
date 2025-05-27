// You can add interactive functionality here later if needed
// You can add interactive functionality here later if needed
import "./navBarAdmin.css";
import "./nav_bar.css"
import UserMenu from './userMenu.js';

function NavBarAdmin() {
    return (
        <>
            <div className="nav-bar">
                <div className="logo">
                    <img src="https://static.wixstatic.com/media/8c1082_500d66cd227a4dfab9a7361dcbbabadb~mv2.png/v1/fit/w_2500,h_1330,al_c/8c1082_500d66cd227a4dfab9a7361dcbbabadb~mv2.png" alt="STEM Logo" className="logo-image"></img>
                </div>
                <nav className="menu">
                    <span><a href="/">Home</a></span>
                    <span><a href="#">Resources</a></span>
                    <span><a href="/members">Onboarding Interns</a></span>
                    <span><a href="/access">Admin Console</a></span>
                    <span><a href="/ticketing">Ticketing</a></span>
                </nav>
                <div className="account">
                    <UserMenu />
                </div>
            </div>
        </>
    );
}

export default NavBarAdmin;
