// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "instagram1-5d411.firebaseapp.com",
  projectId: "instagram1-5d411",
  storageBucket: "instagram1-5d411.appspot.com",
  messagingSenderId: "423408894567",
  appId: "1:423408894567:web:4d0f7c6c0139a07be9cac2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);