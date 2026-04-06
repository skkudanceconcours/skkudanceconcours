import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { Analytics, getAnalytics, isSupported, logEvent } from "firebase/analytics";

// Origin Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// // Test Firebase
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_TEST_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_TEST_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_TEST_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_TEST_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_TEST_AUTH_DOMAIN,
//   appId: process.env.NEXT_PUBLIC_TEST_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_TEST_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (클라이언트 환경에서만 초기화)
let analytics: Analytics | null = null;
isSupported().then((supported) => {
  if (supported) analytics = getAnalytics(app);
});

export const trackEvent = (eventName: string, params?: Record<string, string | number | boolean>) => {
  if (analytics) logEvent(analytics, eventName, params);
};

export const db = getFirestore(app);
