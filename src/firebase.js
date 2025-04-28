// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAfLq_OH629xo8-sUAYepBrffHCW8pwG30",
  authDomain: "jerry-12d12.firebaseapp.com",
  projectId: "jerry-12d12",
  storageBucket: "jerry-12d12.firebasestorage.app",
  messagingSenderId: "116614726157",
  appId: "1:116614726157:web:6f4aef7599ac1924b08b44",
  measurementId: "G-FN8CR423BS"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig)

// 初始化 Auth 登入用
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

export { auth, provider, db, signInWithPopup }