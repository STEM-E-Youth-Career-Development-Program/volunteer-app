// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);