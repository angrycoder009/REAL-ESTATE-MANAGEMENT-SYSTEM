// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8VQjykDvMElIKtfgMzWnCJjDITbnjBlU",
  authDomain: "homer-a7af8.firebaseapp.com",
  projectId: "homer-a7af8",
  storageBucket: "homer-a7af8.appspot.com",
  messagingSenderId: "438070622599",
  appId: "1:438070622599:web:ce070706c4caa9c9dd7b22"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export  const db = getFirestore()