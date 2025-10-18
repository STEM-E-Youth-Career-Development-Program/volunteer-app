// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your project's config (this is fine to keep in client code)
const firebaseConfig = {
  apiKey: "AIzaSyAuuq0i6-DITTNOFGzut3hy7ncsHgPj8bo",
  authDomain: "stem-e-volunteer-app.firebaseapp.com",
  projectId: "stem-e-volunteer-app",
  storageBucket: "stem-e-volunteer-app.appspot.com",
  messagingSenderId: "238931221133",
  appId: "1:238931221133:web:00e64c3b8b9211f0b720c4",
  measurementId: "G-6FEZM656MH"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
