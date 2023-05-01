// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
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
export const auth = getAuth();
//const analytics = getAnalytics(app);

export const findOutConnection = () => {
  let value = false;
  const db = getDatabase();
  const connectedRef = ref(db, ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      value = true
    } 
  });
  console.log(value)
  return value
};
