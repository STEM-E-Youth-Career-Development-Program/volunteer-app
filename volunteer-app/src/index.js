import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc, 
    writeBatch, 
    doc, 
    setDoc, 
    deleteDoc, 
    query, 
    where, 
    updateDoc 
} from "firebase/firestore"; 

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetching Interns for console log
const colInterns = collection(db, 'Interns');
getDocs(colInterns)
    .then((snapshot) => {
        console.log("Interns:");
        snapshot.docs.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(err => console.error("Firebase fetch error:", err));

// Export Firebase functions (db is exported from firebase.js)
export { 
    collection, 
    deleteDoc, 
    getDocs, 
    addDoc, 
    doc, 
    writeBatch, 
    setDoc, 
    query, 
    where, 
    updateDoc 
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();