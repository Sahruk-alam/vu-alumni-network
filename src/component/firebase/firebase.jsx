// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVfL9_8INuHwPZpxlkaMCqjOw_THuGN70",
  authDomain: "vu-alumni.firebaseapp.com",
  projectId: "vu-alumni",
  storageBucket: "vu-alumni.firebasestorage.app",
  messagingSenderId: "757906839904",
  appId: "1:757906839904:web:7c591d4309429a716d2605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);