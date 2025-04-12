// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfLq_OH629xo8-sUAYepBrffHCW8pwG30",
  authDomain: "jerry-12d12.firebaseapp.com",
  projectId: "jerry-12d12",
  storageBucket: "jerry-12d12.firebasestorage.app",
  messagingSenderId: "116614726157",
  appId: "1:116614726157:web:6f4aef7599ac1924b08b44",
  measurementId: "G-FN8CR423BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);