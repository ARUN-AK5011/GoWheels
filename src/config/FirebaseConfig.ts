// firebaseConfig.ts
import { initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Correct Firebase config
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAyEdktYpQV8znbC4CIVB0hVrqH3m3PGKY",
  authDomain: "go-wheels-b0255.firebaseapp.com",
  projectId: "go-wheels-b0255",
  storageBucket: "go-wheels-b0255.appspot.com", // ✅ fixed .app → .appspot.com
  messagingSenderId: "1039876666128",
  appId: "1:1039876666128:web:f44e0c64f9583dfa23ab95", // ✅ corrected format
};

// Initialize Firebase App
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const firebaseAuth = getAuth(firebaseApp);
