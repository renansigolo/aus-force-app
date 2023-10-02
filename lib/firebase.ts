// Import the functions you need from the SDKs you need
import { DatabaseUser } from "@/app/dashboard/profile/page"
import { trimFormValues } from "@/lib/helpers"
import { getApp, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
  DocumentSnapshot,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

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

// export const listenToCollection = (collectionName: string, callback: (data: any[]) => void) => {
//   const query = collection(db, collectionName)

//   const unsubscribe = onSnapshot(query, (snapshot) => {
//     const data: any[] = []
//     snapshot.forEach((doc) => {
//       data.push({ id: doc.id, ...doc.data() })
//     })
//     callback(data)
//   })

//   // Return an unsubscribe function to stop listening when needed
//   return unsubscribe
// }

/** Gets a users/{uid} document with username */
// export async function getUserDoc(uid: string) {
//   const q = query(collection(db, "users"), where("uid", "==", uid), limit(1))
//   const userDoc = (await getDocs(q)).docs[0]

//   return userDoc
// }

export const getUserDoc = async (uid: string) => {
  const docRef = doc(db, `users/${uid}`)
  const docSnapshot = await getDoc(docRef)
  const data = docSnapshot.data() as DatabaseUser
  return data
}

type FirestoreCollectionName = "users" | "leaveRequests" | "jobSites" | "jobRequests" | "clients"

export const getCollectionQuery = async (
  collectionName: FirestoreCollectionName,
  orderByValue: QueryOrderByConstraint | QueryFieldFilterConstraint,
  limitTo?: number,
) => {
  const ref = collection(db, collectionName)
  const q = query(ref, orderByValue, limit(limitTo || 10))
  const data = (await getDocs(q)).docs.map(serializeDoc)
  return data as any
}

export const getCollection = async (collectionName: FirestoreCollectionName) => {
  const ref = collection(db, collectionName)
  const data = (await getDocs(ref)).docs.map(serializeDoc)
  return data
}

// Create firebase CRUD helpers
export const createDocument = async (collectionName: FirestoreCollectionName, data: object) => {
  const ref = collection(db, collectionName)
  const docRef = await addDoc(ref, trimFormValues({ createdAt: serverTimestamp(), ...data }))
  return docRef
}

export const readDocument = async (collectionName: FirestoreCollectionName, docId: string) => {
  const ref = doc(db, collectionName, docId)
  const docSnap = await getDoc(ref)
  return serializeDoc(docSnap)
}

export const updateDocument = async (
  collectionName: FirestoreCollectionName,
  docId: string,
  data: object,
) => {
  const ref = doc(db, collectionName, docId)
  const response = await updateDoc(ref, data)
  return response
}

export const deleteDocument = async (collectionName: FirestoreCollectionName, docId: string) => {
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

/** Upload a file to firebase storage */
export async function upload(storagePath: string, file: Blob | null | undefined) {
  if (!file) return ""

  const storageRef = ref(storage, storagePath)
  const fileSnapshot = await uploadBytes(storageRef, file)

  const fileRef = ref(storage, fileSnapshot.ref.fullPath)
  const fileURL = await getDownloadURL(fileRef)

  return fileURL
}
