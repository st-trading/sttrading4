import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";

// Configuration directly loaded or copied for flawless execution
const firebaseConfig = {
  projectId: "influential-photon-qsjh2",
  appId: "1:164564395393:web:f560d46ad32dfc7a603480",
  apiKey: "AIzaSyBjJ63y4_r4n6VIhKTRMiF7tQMy1nNj5Xs",
  authDomain: "influential-photon-qsjh2.firebaseapp.com",
  databaseId: "ai-studio-d17b2aa9-ed1f-4d66-9f62-73ca94b836d3",
  storageBucket: "influential-photon-qsjh2.firebasestorage.app",
  messagingSenderId: "164564395393",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider to prompt for accounts if needed
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Initialize Firestore (handling custom database ID if needed)
export const db = getFirestore(app, firebaseConfig.databaseId);

// CRITICAL CONSTRAINT: When the application initially boots, call getFromServer to test the connection.
async function testConnection() {
  try {
    // Attempting a light load to test firestore connection
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firebase connection test successful");
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration. Client appears offline.");
    } else {
      console.log("Firebase connection verification complete (test document may be missing, which is expected)");
    }
  }
}

testConnection();
