import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getFirestore, deleteDoc, collection, getDocs, addDoc, writeBatch, doc, setDoc, updateDoc, query, where } from "firebase/firestore"; 
// https://firebase.google.com/docs/web/setup#available-libraries
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuuq0i6-DITTNOFGzut3hy7ncsHgPj8bo",
    authDomain: "stem-e-volunteer-app.firebaseapp.com",
    projectId: "stem-e-volunteer-app",
    storageBucket: "stem-e-volunteer-app.appspot.com",
    messagingSenderId: "238931221133",
    appId: "1:238931221133:web:00e64c3b8b9211f0b720c4",
    measurementId: "G-6FEZM656MH"
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

export { db, collection, deleteDoc, getDocs, addDoc, doc, writeBatch, setDoc, query, where, updateDoc};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

reportWebVitals();
