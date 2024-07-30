// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7t23cei0GBeK8DcRIp0fHrY3NdAMjb9c",
  authDomain: "kimochi-tree.firebaseapp.com",
  projectId: "kimochi-tree",
  storageBucket: "kimochi-tree.appspot.com",
  messagingSenderId: "1049099301295",
  appId: "1:1049099301295:web:ccb7182f7fb6ada659ff5a",
  measurementId: "G-BNYZBZ4HPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);