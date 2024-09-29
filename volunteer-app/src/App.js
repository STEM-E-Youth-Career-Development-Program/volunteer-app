import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Login from "./Pages/loginform.js"
import HomePage from "./Pages/homePage.js"
import AccPageOthers from "./Pages/AccPageOthers.js";
import SamplePage from "./Pages/SamplePage.js";
import SupportForm from "./Pages/Supportform.js";
import ErrorPage from "./Pages/ErrorPage.js"

function App() {
    const [session, setSession] = useState([]);
    const login = <Login session={session} setSession={setSession } />
    return <>
        <Router>
            <Routes>
                <Route path="/" element={login} />
                <Route path="/home" element={<HomePage />}/>
                <Route path="/userpage" element={<AccPageOthers />}/>
                <Route path="/samplepage" element={<SamplePage />}/>
                <Route path="/supportform" element={<SupportForm />}/>
                <Route path="/error" element={<ErrorPage />}/>
            </Routes>
        </Router>
    </>;
}

export default App;
