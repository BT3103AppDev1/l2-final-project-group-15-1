<template>
    <div class="admin-home-page">
      <h1>Admin Home Page</h1><br><br><br><br>
      <div class="search-container">
        <input
          type="text"
          placeholder="Search for patients"
          v-model="searchTerm"
          class="search-input"
        />
        <button @click="searchPatients" class="search-button">
          Search
        </button>
      </div>
      <!-- searchResults array from searchPatients() function -->
      <div v-if="searchResults.length > 0">
        <ul>
            <!-- iterates through the array, displaying the user's name, email, medical condition, 
            and a button to open the user's account, to be implemented. -->
          <li v-for="(user, index) in searchResults" :key="index">
            <p>
              Name: {{ user.name }}<br />
              Email: {{ user.email }}<br />
              Medical Condition: {{ user.medicalCondition }}
            </p>
            <button @click="openUserAccount(user.id)">
              Open User Account
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
import { collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";

  export default {
    data() {
      return {
        searchTerm: '',
        searchResults: [],
      };
    },

    methods: {
        // async searchPatients() {
        // const searchTerm = this.searchTerm.trim().toLowerCase();

        // if (!searchTerm) {
        //     this.searchResults = [];
        //     return;
        // }

        // const db = getFirestore(firebaseApp);
        // const usersRef = collection(db, 'PillPal');

        // // Query users by name and email
        // const nameQuery = query(usersRef, where('name', '==', searchTerm));
        // const emailQuery = query(usersRef, where('email', '==', searchTerm));

        // // Fetch matching users
        // const [nameSnap, emailSnap] = await Promise.all([
        //     getDocs(nameQuery),
        //     getDocs(emailQuery),
        // ]);

        // // Combine search results and remove duplicates
        // const uniqueResults = new Map();
        // for (const doc of [...nameSnap.docs, ...emailSnap.docs]) {
        //     const userData = { id: doc.id, ...doc.data() };
        //     uniqueResults.set(doc.id, userData);
        // }

        // this.searchResults = Array.from(uniqueResults.values());
        // },

        openUserAccount(userId) {
            // Implement the logic to open the user's account
        },
        },
    };
  </script>
  
  <style scoped>
  .admin-home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
  }
  
  .search-input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    margin-right: 0.5rem;
  }
  
  .search-button {
    padding: 0.5rem 1rem;
    background-color: rgb(39, 155, 39);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .search-button:hover {
    background-color: rgb(25, 122, 25);
  }
  </style>
  