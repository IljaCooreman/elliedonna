import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDBG5iKycnCm272kVYUAOBwefB23Mdzu3c",
  authDomain: "ellie-donna.firebaseapp.com",
  projectId: "ellie-donna",
  storageBucket: "ellie-donna.appspot.com",
  messagingSenderId: "53620408933",
  appId: "1:53620408933:web:eef1131bd4d8a7f2aefc8c",
  measurementId: "G-J3S8EZ9N4Q"
  });
  
export const db = firebase.firestore();
export const fbStorage = firebase.storage();
