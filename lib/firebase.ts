// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
// export const emailAuthProvider = new EmailAuthProvider()

// Firestore
export const db = getFirestore(firebaseApp)

// Storage
export const storage = getStorage(firebaseApp)

/** Gets a users/{uid} document with username */
// export async function getUserDoc(uid: string) {
//   const q = query(collection(db, "users"), where("uid", "==", uid), limit(1))
//   const userDoc = (await getDocs(q)).docs[0]
//   console.log("🚀 ~ getUserDoc ~ userDoc:", userDoc)
//   return userDoc
// }
