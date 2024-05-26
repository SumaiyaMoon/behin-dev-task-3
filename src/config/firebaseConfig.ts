// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB67jhMdlGji79OauOKhBzmeLG2Gk_BuE4",
  authDomain: "moon-chat-app-bdt3.firebaseapp.com",
  projectId: "moon-chat-app-bdt3",
  storageBucket: "moon-chat-app-bdt3.appspot.com",
  messagingSenderId: "865999702768",
  appId: "1:865999702768:web:9432c479c69a61d3195035",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
