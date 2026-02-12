import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, collection, getDocs, deleteDoc, addDoc, doc, writeBatch, setDoc, query, where } from "./index.js"

async function findUser(dID, dName) {
    try {
        const colUser = collection(db, 'User');
        const q = query(colUser, where("discordID", "==", String(dID)));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            console.log("test");
            return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        } else {
            const ref = await addDoc(colUser, { discordID: dID, isAdmin: false, isCoord: false, name: dName })
            return;
        }
    } catch (error) {
        console.error("Error loading data:", error);
        return [];
    }
}

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

    async getUserGuild(token) {
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

    async getUser(token) {
        const response = await fetch("https://discord.com/api/users/@me", {
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

    async getServerUser(token, guildID) {
        const response = await fetch(`https://discord.com/api/users/@me/guilds/${guildID}/member`, {
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
;
    const userLookUp = async (dID, dName) => {
        try {
            await findUser(dID, dName);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const runAuth = async () => {
            const auth = new Oauth();
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            try {
                if (code) {
                    const token = await auth.getToken(code);
                    const guilds = await auth.getUserGuild(token);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].id == "784234582999695421") { //STEME server ID
                            const user = await auth.getUser(token);
                            const serverUser = await auth.getServerUser(token, "784234582999695421")
                            userLookUp(user.id, serverUser.nick);
                            setSession(user.id);
                            localStorage.setItem('session', JSON.stringify(user.id));
                            break;
                        }
                    }
                }
            } finally {
                if (!session) {
                    navigate('/', { state: { error: "Unauthorized user" } });
                }
            }   
        }
        runAuth();
    }, []);
    return (
        <div>
            <p>{session}</p>
        </div>
    );
};
