import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import './App.css';

import Login from "./Pages/loginform.js"
import Home from "./Pages/home.js"
import AccPageOthers from "./Pages/AccPageOthers.js";
import SamplePage from "./Pages/SamplePage.js";
import SupportForm from "./Pages/Supportform.js";
import ErrorPage from "./Pages/ErrorPage.js"
import AccessManagement from "./Pages/access_management";
import MemberTable from "./Pages/members";
import { Authenticate } from "./DiscordAuth.js";
import Logout from "./Pages/logout";

function App() {
    const [session, setSession] = useState(null);
    useEffect(() => {
        const storedSession = JSON.parse(localStorage.getItem('session'));
        if (storedSession) {
            setSession(storedSession);
        }
    }, []);
    const login = <Authenticate session={session} setSession={setSession} />
    return <>
        <Router>
            <Routes>
                <Route path="/login" element={login} />
                {!session ? (
                    <>
                        <Route path="/" element={<Login />} />
                    </>
                ): (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/userpage" element={<AccPageOthers />} />
                        <Route path="/samplepage" element={<SamplePage />} />
                        <Route path="/supportform" element={<SupportForm />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="/access" element={<AccessManagement />} />
                        <Route path="/members" element={<MemberTable />} />
                        <Route path="/logout" element={<Logout setSession={setSession} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    </>;
}

export default App;
