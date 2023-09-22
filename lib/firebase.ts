// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
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
export const firebaseApp = createFirebaseApp()

// Auth
export const auth = getAuth(firebaseApp)

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

// export const getLiveDocument = async (collectionName: string, docId: string) => {
//   const docRef = doc(db, collectionName, docId)
//   const unsubscribe = onSnapshot(docRef, (doc) => {
//     console.log("Current data: ", doc.data())
//   })
//   return unsubscribe
// }

// export const getCollectionStream = async (collectionName: string) => {
//   const collectionRef = collection(db, collectionName)
//   const q = query(collectionRef)
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const documents = []
//     querySnapshot.forEach((doc) => {
//       documents.push(doc.data().name)
//     })
//     console.log("Current cities in CA: ", documents.join(", "))
//   })
//   return unsubscribe
// }

export const getCollection = async (collectionName: string) => {
  const collectionRef = collection(db, collectionName)
  const querySnapshot = await getDocs(collectionRef)
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return data
}

// Create firebase CRUD helpers
export const createDocument = async (collectionName: string, data: any) => {
  const collectionRef = collection(db, collectionName)
  const docRef = await addDoc(collectionRef, data)
  return docRef
}

export const readDocument = async (collectionName: string, docId: string) => {
  const docRef = await getDoc(doc(db, collectionName, docId))
  return docRef
}

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  const docRef = doc(db, collectionName, docId)
  const response = await updateDoc(docRef, data)
  console.log("🚀 ~ updateDocument ~ response:", response)
  return response
}

export const deleteDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId)
  const response = await deleteDoc(docRef)
  console.log("🚀 ~ deleteDocument ~ response:", response)
  return response
}
