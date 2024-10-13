import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default class Oauth {
    constructor() {
        this.client_id = "1264268210996252843";
        this.client_secret = "V_Jj_oUXnEKLJlSBIwXV-LUxcJaIFQOD";
        this.scope = "guilds+guilds.members.read+email+identify";
        this.redirect_uri = "http://localhost:3000/login";
        this.discord_login_url = `https://discordapp.com/api/oauth2/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scope}`;
    }

    async getToken(userCode) {
        const data = {
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: "authorization_code",
            code: userCode,
            redirect_uri: this.redirect_uri,
        };
        const response = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            body: new URLSearchParams(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error details:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorDetails)}`);
        }

        const result = await response.json();
        return result.access_token;

    }

    async getUser(token) {
        const response = await fetch("https://discord.com/api/users/@me/guilds", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error details:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorDetails)}`);
        }

        const result = await response.json();
        return result;
    }
}

export const Authenticate = ({session, setSession }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const auth = new Oauth();
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            auth.getToken(code).then((token) => {
                auth.getUser(token).then((user) => {
                    for (let i = 0; i < user.length; i++) {
                        if (user[i].id == "784234582999695421") {
                            setSession(token);
                            localStorage.setItem('session', JSON.stringify(token));
                            break;
                        }
                    }
                    if(!session) {
                        navigate('/', { state: { error: "Unauthorized user" } });
                    }
                    
                })
                
            });
        }
        
    }, []);
    return (
        <div>
            <p>{session}</p>
        </div>
    );
};
