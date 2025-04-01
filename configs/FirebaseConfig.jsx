// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "ai-logo-generator-53db3.firebaseapp.com",
//   projectId: "ai-logo-generator-53db3",
//   storageBucket: "ai-logo-generator-53db3.firebasestorage.app",
//   messagingSenderId: "93255316804",
//   appId: "1:93255316804:web:16d550b16f843890f95311",
//   measurementId: "G-8YY2BT8B2C"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db=getFirestore(app);



// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-generator-53db3.firebaseapp.com",
  projectId: "ai-logo-generator-53db3",
  storageBucket: "ai-logo-generator-53db3.appspot.com", // Fixed this from firebasestorage.app
  messagingSenderId: "93255316804",
  appId: "1:93255316804:web:16d550b16f843890f95311",
  measurementId: "G-8YY2BT8B2C"
};

// Initialize Firebase
let app;
let db;

// Check if Firebase app has been initialized
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firestore
db = getFirestore(app);

// Initialize Analytics only on client-side
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    getAnalytics(app);
  }).catch(err => {
    console.error("Analytics failed to load:", err);
  });
}

export { db };