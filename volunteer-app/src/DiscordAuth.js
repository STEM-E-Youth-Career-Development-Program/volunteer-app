import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, collection, getDocs, deleteDoc, addDoc, doc, writeBatch, updateDoc, query, where } from "./index.js"

async function findUser(dID, dName) {
    try {
        const colUser = collection(db, 'User');
        const q = query(colUser, where("discordID", "==", String(dID)));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            console.log("test");
            await updateDoc(colUser, { name: dName });
            return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        } else {
            await addDoc(colUser, { discordID: dID, isAdmin: false, isCoord: false, name: dName })
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

    async getDiscordUser(token) {
        const response = await fetch("https://discord.com/api/users/@me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error details:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorDetails)}`);
        }
        return response.json();
    }

    async getUserRoles(discordId) {
        const userQuery = query(collection(db, 'User'), where('discordID', '==', discordId));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return userDoc.data();
        }
        return null;
    }
}

export const Authenticate = ({ setSession }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = new Oauth();
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            auth.getToken(code).then(async (token) => {
                const discordUser = await auth.getDiscordUser(token);
                const userRoles = await auth.getUserRoles(discordUser.id);

                if (userRoles) {
                    const sessionData = { token, user: { ...userRoles, role: userRoles.role || 'member' } };
                    setSession(sessionData);
                    localStorage.setItem('session', JSON.stringify(sessionData));
                    navigate('/');
                } else {
                    navigate('/permission-denied');
                }
            });
        }
    }, [navigate, setSession]);

    return <div>Authenticating...</div>;
};
