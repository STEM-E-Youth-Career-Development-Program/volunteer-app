import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, writeBatch, doc } from "firebase/firestore"; 
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

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const colUser = collection(db, 'User');
getDocs(colUser)
    .then((snapshot) => {
        console.log("Users:");
        snapshot.docs.forEach((doc) => {
            console.log(doc.data());
        })
    })
/*
User = {
    name: (string),
    discordID: (string),
    isCoord: (boolean),
    isAdmin: (boolean)
}
*/

const colInterns = collection(db, 'Interns');
getDocs(colInterns)
    .then((snapshot) => {
        console.log("Interns:");
        snapshot.docs.forEach((doc) => {
            console.log(doc.data());
        })
    })
/*
Interns = {
    name: (string),
    email: (string),
    discordID: (string),
    inTimeSheet: (boolean),
    inServer: (boolean),
    signedWaiver: (boolean),
    paused: (null | timestamp)
}
*/

export { db, collection, getDocs, doc, writeBatch };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

reportWebVitals();
