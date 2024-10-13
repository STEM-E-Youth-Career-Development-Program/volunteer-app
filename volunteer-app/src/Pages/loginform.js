import "./loginform.css"
import discordLogo from './static/discord.png'
import Oauth from './../DiscordAuth.js'
import { useLocation } from 'react-router-dom';


function Login() {
    const location = useLocation();
    const error = location.state?.error;
    let auth = new Oauth();
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
                    <p className="smalltext"><a href="/home">Need Help?</a></p>
                    <p className="errortext smalltext">{error}</p>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Login;
