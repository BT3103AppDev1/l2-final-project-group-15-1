import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration (now is david's, change to kent next time)
const firebaseConfig = {
  apiKey: "AIzaSyA-ktRrt8bqnXLdkKMt-ssTKkk6InwgzsA",
  authDomain: "bt3103-74add.firebaseapp.com",
  projectId: "bt3103-74add",
  storageBucket: "bt3103-74add.appspot.com",
  messagingSenderId: "712226669576",
  appId: "1:712226669576:web:750d8f4eccdef2791e7dbd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Exporting firebaseApp
export default firebase;