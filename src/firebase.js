// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration (now is david's, change to kent next time)
const firebaseConfig = {
  apiKey: "AIzaSyDhMNuxoFwnb2P8j3ZOrAVzN0sUew_HNlw",
  authDomain: "democppvue-3cdd7.firebaseapp.com",
  projectId: "democppvue-3cdd7",
  storageBucket: "democppvue-3cdd7.appspot.com",
  messagingSenderId: "319797063750",
  appId: "1:319797063750:web:5bfde9d840de3fad135a47"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

