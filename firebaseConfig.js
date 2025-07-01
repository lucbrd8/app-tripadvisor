// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEwWNt4nOn4NH1pvzG8cul5iflORmHpEc",
  authDomain: "tripadvisor-225e9.firebaseapp.com",
  projectId: "tripadvisor-225e9",
  storageBucket: "tripadvisor-225e9.firebasestorage.app",
  messagingSenderId: "978353746475",
  appId: "1:978353746475:web:79c2d233607b2dd61c706e",
  measurementId: "G-BK5XQMKR3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);