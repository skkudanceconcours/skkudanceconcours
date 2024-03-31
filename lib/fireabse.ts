import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-cOI8qzAq4eaoW1j1EhRuT1by8pn1FfI",
  authDomain: "skkudanceconcours.firebaseapp.com",
  projectId: "skkudanceconcours",
  storageBucket: "skkudanceconcours.appspot.com",
  messagingSenderId: "187468832932",
  appId: "1:187468832932:web:d5260b81c99f9ceff98631",
  measurementId: "G-6J8LM6E8H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// # Used Functions
// const analytics = getAnalytics(app);
export const db = getFirestore(app);