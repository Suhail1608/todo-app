// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe13IMyCxzRV7YJP2r7n-OdrkYR3a8c24",
  authDomain: "todo-app-746b7.firebaseapp.com",
  projectId: "todo-app-746b7",
  storageBucket: "todo-app-746b7.firebasestorage.app",
  messagingSenderId: "534188160755",
  appId: "1:534188160755:web:8db9422458a306ae246986",
  measurementId: "G-HB00SE8FZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);