import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATtBbOcQOVFVoSQIs4GldUFU_D3AGMiVw",
  authDomain: "electrica-36fa4.firebaseapp.com",
  projectId: "electrica-36fa4",
  storageBucket: "electrica-36fa4.firebasestorage.app",
  messagingSenderId: "31228836589",
  appId: "1:31228836589:web:92f88215c8c8660e9c2ae4",
  measurementId: "G-3EP0WG7MZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
