// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeFirestore, persistentLocalCache, persistentSingleTabManager} from 'firebase/firestore'

// dotenv.config();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'key'/*import.meta.env.VITE_API_KEY*/,
  authDomain:'domain' /*import.meta.env.VITE_AUTH_DOMAIN*/,
  projectId:'id' /*import.meta.env.VITE_PROJECT_ID*/,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// console.log(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// initializeAuth(app);

export const db = initializeFirestore(app, {
    experimentalForceLongPolling:true,
    localCache:persistentLocalCache(/*settings*/{tabManager: persistentSingleTabManager({})})
})

// export const auth = getAuth();