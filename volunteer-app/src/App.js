import React, { useState } from "react";
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
import Ticketing from "./Ticketing/Ticketing.js";
import PermissionDenied from "./Pages/PermissionDenied.js";

function getStoredSession() {
    const storedSession = localStorage.getItem("session");

    if (!storedSession) {
        return null;
    }

    try {
        return JSON.parse(storedSession);
    } catch {
        localStorage.removeItem("session");
        return null;
    }
}

function App() {
    const [session, setSession] = useState(getStoredSession);
    const isAuthenticated = Boolean(session);

    return <>
        <Router>
            <Routes>
                <Route path="/login" element={<Authenticate setSession={setSession} />} />
                <Route path="/permission-denied" element={<PermissionDenied />} />
                {!isAuthenticated ? (
                    <>
                        <Route path="/" element={<Login />} />
                    </>
                ): (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/userpage" element={<AccPageOthers />} />
                        <Route path="/samplepage" element={<SamplePage />} />
                        <Route path="/ticketing" element={<Ticketing session={session} />} />
                        <Route path="/supportform" element={<SupportForm />} />
                        <Route path="/error" element={<ErrorPage />} />
                        
                        <Route path="/access" element={<AccessManagement />} />
                        <Route path="/members" element={<MemberTable />} />
                        <Route path="/logout" element={<Logout setSession={setSession} />} />
                    </>
                )}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
            </Routes>
        </Router>
    </>;
}

export default App;
