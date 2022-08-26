// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9zes5vt7N0MYXH-mfzDZyu7SmJNsmj8w",
  authDomain: "fiyrsocialmediaapp.firebaseapp.com",
  projectId: "fiyrsocialmediaapp",
  storageBucket: "fiyrsocialmediaapp.appspot.com",
  messagingSenderId: "203064906560",
  appId: "1:203064906560:web:652bbfa037a644c3b5a0a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app