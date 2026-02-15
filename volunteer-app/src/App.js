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
import Ticketing from "./Ticketing/Ticketing.js";
import PermissionDenied from "./Pages/PermissionDenied.js";
import ProtectedRoute from "./ProtectedRoute.js";

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
                <Route path="/permission-denied" element={<PermissionDenied />} />
                {!session ? (
                    <>
                        <Route path="/" element={<Login />} />
                    </>
                ): (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/userpage" element={
                            <ProtectedRoute session={session} allowedRoles={['member', 'admin']}>
                                <AccPageOthers />
                            </ProtectedRoute>
                        } />
                        <Route path="/samplepage" element={
                            <ProtectedRoute session={session} allowedRoles={['member', 'admin']}>
                                <SamplePage />
                            </ProtectedRoute>
                        } />
                        <Route path="/ticketing" element={
                            <ProtectedRoute session={session} allowedRoles={['member', 'admin']}>
                                <Ticketing />
                            </ProtectedRoute>
                        } />
                        <Route path="/supportform" element={
                            <ProtectedRoute session={session} allowedRoles={['member', 'admin']}>
                                <SupportForm />
                            </ProtectedRoute>
                        } />
                        <Route path="/error" element={<ErrorPage />} />
                        
                        <Route path="/access" element={
                            <ProtectedRoute session={session} allowedRoles={['admin']}>
                                <AccessManagement />
                            </ProtectedRoute>
                        } />
                        <Route path="/members" element={
                            <ProtectedRoute session={session} allowedRoles={['member', 'admin']}>
                                <MemberTable />
                            </ProtectedRoute>
                        } />
                        <Route path="/logout" element={<Logout setSession={setSession} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    </>;
}

export default App;
