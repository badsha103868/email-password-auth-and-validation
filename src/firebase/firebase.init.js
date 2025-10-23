// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// DANGER --- DO NOT SHARE CONFIG IN PUBLIC
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqdZpWXSBFbWwI4E-FPBmJVpb-ivXcfwM",
  authDomain: "email-password-auth-223e4.firebaseapp.com",
  projectId: "email-password-auth-223e4",
  storageBucket: "email-password-auth-223e4.firebasestorage.app",
  messagingSenderId: "611079613555",
  appId: "1:611079613555:web:5820c4e59407fba4294e06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); 