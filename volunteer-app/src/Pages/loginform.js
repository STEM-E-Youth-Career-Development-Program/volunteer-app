import "./loginform.css"
import discordLogo from './static/discord.png'
import Oauth from './../DiscordAuth.js'

const auth = new Oauth();
function Login() {
    return (
    <div className="login">
        <div className="center">
            <h2>Log in</h2>
            <form>
                <div>
                    <button type="submit" id="submitButton" className="button">
                        Login with Discord
                        <a href={auth.discord_login_url}><img src={discordLogo} alt="Smartphones"></img></a>
                    </button>
                    <p className="smalltext"><a href="#">Need Help?</a></p>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Login;