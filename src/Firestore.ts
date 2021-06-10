import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDjXnjfH-EbxsJH-l1tNRAM-MGGSDAG778",
    authDomain: "bakmanschap.firebaseapp.com",
    projectId: "bakmanschap",
    storageBucket: "bakmanschap.appspot.com",
    messagingSenderId: "546616411010",
    appId: "1:546616411010:web:9bfa3de5b2ce243653059b",
    measurementId: "G-B6ENMVMH1H"
  });
  
export const db = firebase.firestore();
export const fbStorage = firebase.storage();
