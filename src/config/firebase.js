// import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByFoNxrmU6w09muTgx8PoEVOA0Wn-_29g",
  authDomain: "vcoolprojects.firebaseapp.com",
  projectId: "vcoolprojects",
  storageBucket: "vcoolprojects.appspot.com",
  messagingSenderId: "1029845419415",
  appId: "1:1029845419415:web:dc55c47a1e6cb9dc7370d2"
};

// Initialize Firebase
// const db = getFirestore(app);

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {auth, app};