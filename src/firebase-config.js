// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA89E1VI-M6ULAL9ubAS6ZW2XoM69yoVMw",
  authDomain: "cochabamba-3a132.firebaseapp.com",
  projectId: "cochabamba-3a132",
  storageBucket: "cochabamba-3a132.firebasestorage.app",
  messagingSenderId: "1044499945795",
  appId: "1:1044499945795:web:01595f1a15c333943f77f6",
  measurementId: "G-WB8EYG7V8Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
