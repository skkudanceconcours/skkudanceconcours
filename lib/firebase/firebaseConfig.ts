import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Origin Firebase
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

// Test Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_TEST_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_TEST_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_TEST_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_TEST_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_TEST_AUTH_DOMAIN,
  appId: process.env.NEXT_PUBLIC_TEST_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_TEST_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// # Used Functions
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
