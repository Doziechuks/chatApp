import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkBgLBfB54TH9N0B_DJvYkFxb-fmgCP0g",
  authDomain: "fir-eb8f0.firebaseapp.com",
  projectId: "fir-eb8f0",
  storageBucket: "fir-eb8f0.appspot.com",
  messagingSenderId: "708550444834",
  appId: "1:708550444834:web:3962de867d9f1e717e877b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

