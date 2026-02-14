import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnQfeISCUtW4Q-2BXBCtSLObYMUfBZA2Q",
  authDomain: "ethdenver-3d74c.firebaseapp.com",
  projectId: "ethdenver-3d74c",
  storageBucket: "ethdenver-3d74c.firebasestorage.app",
  messagingSenderId: "171192981177",
  appId: "1:171192981177:web:6834634db75bf42428ed68",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
