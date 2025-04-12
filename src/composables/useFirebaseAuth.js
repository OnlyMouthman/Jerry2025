import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// ✅ 初始化 Firebase
const firebaseConfig = {
  apiKey: "-",
  authDomain: "jerry-12d12.firebaseapp.com",
  projectId: "jerry-12d12",
  storageBucket: "jerry-12d12.firebasestorage.app",
  messagingSenderId: "116614726157",
  appId: "1:116614726157:web:",
  measurementId: "G-"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// ✅ 匯出組件可用方法
export function useFirebaseAuth() {
  return {
    auth,
    signInWithGoogle: () => signInWithPopup(auth, provider),
    signOutFirebase: () => signOut(auth)
  }
}