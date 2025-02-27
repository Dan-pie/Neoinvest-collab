import {  initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMz4tVNWPVkqasAUW6l9s1hpNVTPtJQms",
  authDomain: "neoinvest-41343.firebaseapp.com",
  projectId: "neoinvest-41343",
  storageBucket: "neoinvest-41343.firebasestorage.app",
  messagingSenderId: "234512209194",
  appId: "1:234512209194:web:03388c280ab73e6cbeba53"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
