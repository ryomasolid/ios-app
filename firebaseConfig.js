import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOXPeF51IVfpm0yD4o6X7_ZlVhl-3oTgQ",
  authDomain: "don-t-snack.firebaseapp.com",
  projectId: "don-t-snack",
  storageBucket: "don-t-snack.firebasestorage.app",
  messagingSenderId: "960322768343",
  appId: "1:960322768343:web:ac85f46062993713c38f92",
  measurementId: "G-6NC10NSRLG"
};

// Firebase の初期化
const app = initializeApp(firebaseConfig);

// Firestore の初期化
const db = getFirestore(app);

export { db };

