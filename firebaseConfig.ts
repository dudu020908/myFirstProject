// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSzKkK6f5OjugvkyWMQ85NO7ypUUaIgc",
  authDomain: "daeliminsta-ab472.firebaseapp.com",
  projectId: "daeliminsta-ab472",
  storageBucket: "daeliminsta-ab472.firebasestorage.app",
  messagingSenderId: "742438998903",
  appId: "1:742438998903:web:0426463e38b9aadd8c0772",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication(인증관련 객체)
export const auth = initializeAuth(app);
