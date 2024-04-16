// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-de2d8.firebaseapp.com",
  projectId: "real-estate-de2d8",
  storageBucket: "real-estate-de2d8.appspot.com",
  messagingSenderId: "248709816750",
  appId: "1:248709816750:web:00800b86f353410faae83f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
