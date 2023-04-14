// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDxFePkHPqn2fXI5xlw2TFFvr3GigWKvuA",
  authDomain: "calendario-9c23f.firebaseapp.com",
  projectId: "calendario-9c23f",
  storageBucket: "calendario-9c23f.appspot.com",
  messagingSenderId: "102731295104",
  appId: "1:102731295104:web:923a347b864c37b3cb3965",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
