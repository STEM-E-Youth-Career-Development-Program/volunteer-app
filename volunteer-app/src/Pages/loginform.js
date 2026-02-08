import "./loginform.css"
import discordLogo from './static/discord.png'
import Oauth from './../DiscordAuth.js'
import { useLocation, useNavigate } from 'react-router-dom';


function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const error = location.state?.error;
    let auth = new Oauth();

    const handleDevLogin = () => {
        // Check if test session exists
        const session = JSON.parse(localStorage.getItem('session'));
        if (session) {
            navigate('/');
            window.location.reload(); // Reload to update session state
        }
    };

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
                    <hr style={{margin: '20px 0', border: 'none', borderTop: '1px solid #ccc'}} />
                    <p className="smalltext" style={{fontSize: '12px', color: '#666'}}>Dev Mode:</p>
                    <button 
                        type="button" 
                        onClick={handleDevLogin}
                        style={{
                            background: '#f0f0f0',
                            border: '1px solid #ccc',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Enter as Test User
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Login;
