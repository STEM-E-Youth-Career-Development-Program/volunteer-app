import "./loginform.css"
import discordLogo from './static/discord.png'
import Oauth from './../DiscordAuth.js'
import { useLocation } from 'react-router-dom';
import { useState } from "react";


function Login() {
    const location = useLocation();
    const error = location.state?.error;
    let auth = new Oauth();
    const [showHelp, setShowHelp] = useState(false);
    return (
    <div className="login">
        <div className="center">
            <h2>Log in</h2>
            <form>
                <div>
                    <a href={auth.discord_login_url}>
                        <button type="button" id="submitButton" className="button">
                            Login with Discord
                            <img src={discordLogo} alt="Smartphones"></img>
                        </button>
                    </a>
                    <p
                        className="smalltext"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowHelp(!showHelp)}
                    >
                        Need Help?
                        {showHelp && (
                            <p className="smalltext">
                                If you're having trouble logging in:
                                <br />
                                • Make sure you're logged into Discord  
                                <br />
                                • Make sure you're in the STEME Discord server  
                            </p>
                        )}
                    </p>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Login;

