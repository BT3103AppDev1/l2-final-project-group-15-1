// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA-ktRrt8bqnXLdkKMt-ssTKkk6InwgzsA",
  authDomain: "bt3103-74add.firebaseapp.com",
  projectId: "bt3103-74add",
  storageBucket: "bt3103-74add.appspot.com",
  messagingSenderId: "712226669576",
  appId: "1:712226669576:web:750d8f4eccdef2791e7dbd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;