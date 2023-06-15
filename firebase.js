// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQcsrvdee6RKVCKrXKiEWLaxiQAeKmBaM",
  authDomain: "frema-64c77.firebaseapp.com",
  projectId: "frema-64c77",
  storageBucket: "frema-64c77.appspot.com",
  messagingSenderId: "882168654778",
  appId: "1:882168654778:web:e5de0138924dac1f300b83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)