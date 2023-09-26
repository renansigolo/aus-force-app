// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
  DocumentSnapshot,
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

//   return userDoc
// }

export const getCollection = async (collectionName: string) => {
  const ref = collection(db, collectionName)
  const data = (await getDocs(ref)).docs.map(serializeDoc)

  return data
}

// Create firebase CRUD helpers
export const createDocument = async (collectionName: string, data: any) => {
  const ref = collection(db, collectionName)
  const docRef = await addDoc(ref, data)
  return docRef
}

export const readDocument = async (collectionName: string, docId: string) => {
  const ref = doc(db, collectionName, docId)
  const docSnap = await getDoc(ref)
  return serializeDoc(docSnap)
}

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  const ref = doc(db, collectionName, docId)
  const response = await updateDoc(ref, data)
  return response
}

export const deleteDocument = async (collectionName: string, docId: string) => {
  const ref = doc(db, collectionName, docId)
  const response = await deleteDoc(ref)
  return response
}

/** Add the document id and serialize the createdAt to type Date */
export function serializeDoc(doc: DocumentSnapshot) {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
    createdAt: data?.createdAt?.toMillis() || 0,
  }
}
