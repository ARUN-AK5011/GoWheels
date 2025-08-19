// firebaseConfig.ts
import { initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Correct Firebase config
const firebaseConfig: FirebaseOptions = {
  apiKey: "API KEY",
  authDomain: "DOMAIN.com",
  projectId: "PROJECTID",
  storageBucket: "BUCKET", // ✅ fixed .app → .appspot.com
  messagingSenderId: "SENDERID",
  appId: "APPID", // ✅ corrected format
};

// Initialize Firebase App
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const firebaseAuth = getAuth(firebaseApp);
