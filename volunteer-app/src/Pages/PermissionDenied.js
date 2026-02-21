import React from 'react';
import { useNavigate } from "react-router-dom"
import './PermissionDenied.css';

const PermissionDenied = () => {
    const navigate = useNavigate();
    return (
        <div className="permission-denied-container">
            <h1>Permission Denied</h1>
            <p>You do not have the necessary permissions to access this page. Please contact the administrator for assistance.</p>
            <button className="home-button" onClick={() => navigate("/")}>Go to Home Page</button>
        </div>
    );
};

export default PermissionDenied;
