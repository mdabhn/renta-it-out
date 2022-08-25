// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAHU2h1jM9FJpyfako8Wb77N-d1vYnl1mc',
  authDomain: 'rental-hox.firebaseapp.com',
  projectId: 'rental-hox',
  storageBucket: 'rental-hox.appspot.com',
  messagingSenderId: '432333126042',
  appId: '1:432333126042:web:dfc6430f617b12447e2223',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firebase = getFirestore(app)
