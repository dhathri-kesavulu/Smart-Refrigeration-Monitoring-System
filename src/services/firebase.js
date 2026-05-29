// src/services/firebase.js
// Replace firebaseConfig with your own Firebase project credentials.
// Until then, the app runs on mock data automatically.

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

let db = null;
let firebaseEnabled = false;

try {
  // Only init if real config is provided
  if (!firebaseConfig.apiKey.startsWith("YOUR_")) {
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    firebaseEnabled = true;
  }
} catch (e) {
  console.warn("Firebase not configured — running on mock data.");
}

export { db, firebaseEnabled };
