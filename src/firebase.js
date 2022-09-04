// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQrE_ft8W9_Jg-6Wa6JHZdJkRQLq4_GHE",
  authDomain: "netflix-app-d8ea9.firebaseapp.com",
  projectId: "netflix-app-d8ea9",
  storageBucket: "netflix-app-d8ea9.appspot.com",
  messagingSenderId: "897580039050",
  appId: "1:897580039050:web:6c53de09502a69a4af6673"
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const db = getFirestore(app);
// const auth = firebase.auth();
const auth = getAuth(app);

export {auth, db}