// import { getAuth } from "@firebase/auth";
//import { getFirestore } from "@firebase/firestore";
// import "firebase/firestore";
// import "firebase/auth";
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG1n2pLyQveYxK59VUUsxzOHb2Nf8mJpI",
  authDomain: "react-blog-appi.firebaseapp.com",
  projectId: "react-blog-appi",
  storageBucket: "react-blog-appi.appspot.com",
  messagingSenderId: "543272351212",
  appId: "1:543272351212:web:03ce2564ed6eb29f1ffcc9",
  measurementId: "G-KF5W2N0DWH",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
