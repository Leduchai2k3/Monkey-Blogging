// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAwaPwA_WdP9kbSQv4NYYIkyZ2F9bPon0c",
  authDomain: "monkey-blogging-838a6.firebaseapp.com",
  projectId: "monkey-blogging-838a6",
  storageBucket: "monkey-blogging-838a6.appspot.com",
  messagingSenderId: "672536137853",
  appId: "1:672536137853:web:ce36c2c78267bb80cfa114",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
