// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM4XUaNjZv15-kbA9Xt0fxR0p_ekEt_Zs",
  authDomain: "aus-force.firebaseapp.com",
  projectId: "aus-force",
  storageBucket: "aus-force.appspot.com",
  messagingSenderId: "295994266197",
  appId: "1:295994266197:web:417001252718864bbcbadc",
}

// Initialize Firebase App
function createFirebaseApp() {
  try {
    return getApp()
  } catch {
    return initializeApp(firebaseConfig)
  }
}
const firebaseApp = createFirebaseApp()

// Auth
export const auth = getAuth(firebaseApp)

// Firestore
export const firestore = getFirestore(firebaseApp)

// Storage
export const storage = getStorage(firebaseApp)
