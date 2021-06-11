import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAV2IGYchuxT8VVuN0PmsYAceWOoZRtWO8",
    authDomain: "elliedonna-2efc0.firebaseapp.com",
    projectId: "elliedonna-2efc0",
    storageBucket: "elliedonna-2efc0.appspot.com",
    messagingSenderId: "747916806008",
    appId: "1:747916806008:web:56145a1064498dff67aa8d",
    measurementId: "G-EXK161G3VY"
  });
  
export const db = firebase.firestore();
export const fbStorage = firebase.storage();
