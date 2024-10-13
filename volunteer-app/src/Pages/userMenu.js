import "./userMenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faHouse, faCircleInfo, faEnvelope, faHeadset, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function UserMenu() {
    return (
        <div className="dropdown">
            <FontAwesomeIcon icon={faCircleUser} />
            <div className="dropdown-content">
                <div className="dropdown-row">
                    <FontAwesomeIcon icon={faHouse} />
                    <a href="#">Account</a>
                </div>
                <div className="dropdown-row">
                    <FontAwesomeIcon icon={faHeadset} />
                    <a href="/supportform">Support</a>
                </div>
                <div className="dropdown-row">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <a href="#">FAQ</a>
                </div>
                <div className="dropdown-row">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <a href="#">Contact us</a>
                </div>
                <div className="dropdown-row">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <a href="/logout">Logout</a>
                </div>
            </div>
        </div>
    );
}

export default UserMenu;
