import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyA-ktRrt8bqnXLdkKMt-ssTKkk6InwgzsA",
  authDomain: "bt3103-74add.firebaseapp.com",
  projectId: "bt3103-74add",
  storageBucket: "bt3103-74add.appspot.com",
  messagingSenderId: "712226669576",
  appId: "1:712226669576:web:750d8f4eccdef2791e7dbd",
  measurementId: "G-Z9QDX69313"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Exporting firebaseApp
export default firebase;