<template>
    <div class="admin-home-page">
      <h1>Admin Home Page</h1><br><br><br><br>
      <div class="search-container">
        <input
          type="text"
          placeholder="Search for Patients by Email"
          v-model="searchTerm"
          class="search-input"
        />
        <button @click="searchPatients" class="search-button">
          Search
        </button>
      </div>
      <!-- searchResults array from searchPatients() function -->
      <div class="search-results" v-if="searchResults.length > 0">
            <!-- iterates through the array, displaying the user's name, email, medical condition, 
            and a button to open the user's account, to be implemented. -->
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient Email</th>
              <th>Medical Conditions</th>
              <th>BMI</th>
              <th>Dosage Punctuality</th>
              <th>Contact Patient</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in searchResults" :key="index" class="user-result">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.medicalConditions }}</td>
              <td>{{ user.bmi }}</td>
              <td>{{ user.punctuality }}</td>
              <td>
                <button @click="emailUser(user.email)" class="user-profile-button">
                  Email
                </button>
              </td>
          </tr>
        </tbody>
        </table>
    </div>
    </div>
  </template>
  
<script>
import { collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    data() {
      return {
        searchTerm: '',
        searchResults: [],
      };
    },

    methods: {

        // async searchPatients() {
        //   // Get Firestore reference
        //   const db = getFirestore(firebaseApp);
        //   const usersRef = collection(db, "PillPal");

        //   // Retrieve all documents
        //   const querySnapshot = await getDocs(usersRef);

        //   // Filter documents based on the search term
        //   const searchTermLowerCase = this.searchTerm.toLowerCase(); // convert search input text to lowercase
        //   this.searchResults = querySnapshot.docs
        //     .filter(doc => doc.id.toLowerCase().includes(searchTermLowerCase)) // match lowercase document ID (user email) with searchTermLowerCase
        //     .map(doc => {
        //       return {
        //         name: doc.data().Name, // retrieve 'Name' field from document
        //         email: doc.id, // document ID is the user email
        //         medicalConditions: doc.data().Medical_Conditions,
        //         punctuality: doc.id
        //       };
        //     });
        // },

        async searchPatients() {

          const auth = getAuth(firebaseApp);
          const user = auth.currentUser;

          if (user) {
            if (user.email === "admin@gmail.com") {
              // Get Firestore reference
              const db = getFirestore(firebaseApp);
              const usersRef = collection(db, "PillPal");

              // Retrieve all documents
              const querySnapshot = await getDocs(usersRef);

              // Filter documents based on the search term
              const searchTermLowerCase = this.searchTerm.toLowerCase(); // convert search input text to lowercase
              const searchResults = [];

              function formatPercentage(value) {
                const roundedValue = Math.round(value);
                return (roundedValue === value) ? value : value.toFixed(2);
              }

              for (const doc of querySnapshot.docs) {
                const userEmail = doc.id;
                const userData = doc.data();

                if (userEmail.toLowerCase().includes(searchTermLowerCase)) {
                  // Fetch data from the MedicationRegime subcollection
                  const medicationRegimeRef = collection(db, "PillPal", userEmail, "MedicationRegime");
                  const medicationRegimeSnapshot = await getDocs(medicationRegimeRef);

                  let totalNumbers = 0;
                  let numbersAbove60 = 0;

                  // Iterate through the MedicationRegime documents and calculate punctuality
                  medicationRegimeSnapshot.forEach((medicationRegimeDoc) => {
                    const lag = medicationRegimeDoc.data().Lag || []; // get the 'Lag' field

                    totalNumbers += lag.length;
                    numbersAbove60 += lag.filter(number => number > 60).length;
                  });

                  const punctuality = totalNumbers > 0 ? formatPercentage((numbersAbove60 / totalNumbers) * 100) + "%" : "No Medication";
                  const bmi = (userData.Weight / ((userData.Height/100) ** 2)).toFixed(2);
                  const result = isNaN(bmi) ? "Not Specified" : bmi;
                  searchResults.push({
                    name: userData.Name, // retrieve 'Name' field from document
                    email: userEmail, // document ID is the user email
                    medicalConditions: userData.Medical_Conditions,
                    bmi: result,
                    punctuality: punctuality
                  });
                }
              }
              this.searchResults = searchResults;
            } else {
              console.error('You do not have permission to do this.');
              window.alert('You do not have permission to do this.');
            }
          } else {
            console.error('No user is currently logged in.');
            window.alert('No user is currently logged in.');
          }
        },

        emailUser(userEmail) {
            const emailLink = `mailto:${encodeURIComponent(userEmail)}`;
            window.open(emailLink, '_blank');
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
    background-color: rgb(44, 174, 44);
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

  .search-results {
    display: flex;
    flex-direction: column;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #f2f2f2;
    color: black;
  }

  td:last-child {
    text-align: center;
  }

  .user-profile-button {
    background-color: #a7b3db;
    color: black;
    font-weight: bold;
    padding: 6px 12px;
    border: 2px solid #000000;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    transition-duration: 0.4s;
  }

  .user-profile-button:hover {
    background-color: #6d61c8;
    border-color: #000000;
  }
  </style>
  