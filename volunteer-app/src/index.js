import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Firebase initialization with error handling
let db = null;

try {
    const { initializeApp } = require("firebase/app");
    const { getFirestore } = require("firebase/firestore");
    
    const firebaseConfig = {
        apiKey: "AIzaSyAuuq0i6-DITTNOFGzut3hy7ncsHgPj8bo",
        authDomain: "stem-e-volunteer-app.firebaseapp.com",
        projectId: "stem-e-volunteer-app",
        storageBucket: "stem-e-volunteer-app.appspot.com",
        messagingSenderId: "238931221133",
        appId: "1:238931221133:web:00e64c3b8b9211f0b720c4",
        measurementId: "G-6FEZM656MH"
    };

    initializeApp(firebaseConfig);
    db = getFirestore();
    console.log("Firebase initialized successfully");
} catch (error) {
    console.warn("Firebase initialization failed (using mock mode):", error.message);
    db = null;
}

// Mock implementations for when Firebase is not available
const mockCollection = (db, name) => ({ _name: name });

const mockGetDocs = async (colRef) => {
    console.log("Using mock data for collection:", colRef?._name);
    return { docs: [] };
};

const mockAddDoc = async (colRef, data) => {
    console.log("Mock addDoc called");
    return { id: "mock-id" };
};

const mockDoc = (db, ...args) => ({ _path: args.join("/") });

const mockSetDoc = async (docRef, data) => {
    console.log("Mock setDoc called");
};

const mockWriteBatch = () => ({
    set: () => {},
    update: () => {},
    delete: () => {},
    commit: async () => {}
});

// Set test session in localStorage if not already set
if (!localStorage.getItem('session')) {
    const testSession = {
        discordID: "test-user#0000",
        username: "TestUser",
        avatar: null,
        isAdmin: true
    };
    localStorage.setItem('session', JSON.stringify(testSession));
    console.log("Test session created for development");
}

export {
    db,
    mockCollection as collection,
    mockGetDocs as getDocs,
    mockAddDoc as addDoc,
    mockDoc as doc,
    mockSetDoc as setDoc,
    mockWriteBatch as writeBatch
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

reportWebVitals();
