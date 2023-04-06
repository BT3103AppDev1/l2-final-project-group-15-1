<template>
    <div class="update-particulars-container"><br><br>
      <h1 class="update-particulars-heading">Update Particulars</h1><br>
      <form class="update-particulars-form" @submit.prevent="updateParticulars">
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" placeholder="Full Name" v-model="fullName">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" placeholder="Date of Birth DD/MM/YY" v-model="dob">
        <label for="gender">Gender:</label>
        <select id="gender" name="gender" v-model="gender">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label for="height">Height:</label>
        <input type="number" id="height" placeholder="Height in CM" v-model="height" min="0">
        <label for="weight">Weight:</label>
        <input type="number" id="weight" placeholder="Weight in KG" v-model="weight" min="0">
        <div class="button-container">
          <button class="return-button" @click.prevent="goToHomePage()">Return to Home Page</button>
          <!-- <button class="update-button" @click.prevent="updateParticulars()">Update Particulars</button> -->
          <button class="update-button" type="submit">Update Particulars</button>
        </div>
      </form>
    </div>
</template>
  
<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { increment, arrayUnion,collection, getDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

  export default {
    name: 'UpdateParticulars',
    data() {
      return {
        fullName: '',
        dob: '',
        gender: '',
        height: '',
        weight: '',
      }
    },

    methods: {
    goToHomePage() {
        this.$router.push('/home')
    },

    async updateParticulars() {
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;

        if (user) {
          // const userId = user.uid;
          // right now can only access the document ID "johndoe@gmail.com" in the PillPal collection
          // need to change this document ID to be the unique identifier of the currently logged-in user
          const userId = "johndoe@gmail.com"
          const db = getFirestore(firebaseApp);
          const userRef = doc(db, "PillPal", userId);
          
          const updatedValues = {};
          if (this.fullName) updatedValues.Name = this.fullName;
          if (this.dob) updatedValues.Date_Of_Birth = this.dob;
          if (this.gender) updatedValues.Gender = this.gender;
          if (this.height) updatedValues.Height = this.height;
          if (this.weight) updatedValues.Weight = this.weight;

          await updateDoc(userRef, updatedValues)

        .then(() => {
          window.alert('Particulars updated successfully!');
          // Redirect to home page after updating particulars
          this.$router.push('/home');
        })
        .catch((error) => {
          console.error('Error updating particulars: ', error);
        });
      } else {
        console.error('No user is currently logged in.');
        window.alert('No user is currently logged in.');
      }
    }
  }
}
</script>
  
<style scoped>
  .update-particulars-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .update-particulars-heading {
    margin-top: 0;
  }
  
  .update-particulars-form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    margin-top: 15px;
    margin: px 2;
  }
  
  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin: 12px 0;
  }
  
  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  
  .return-button {
    background-color: grey;
    margin-right: 10px;
  }
  
  .update-button {
    background-color: rgb(0, 214, 4);
  }
  
  .button-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .return-button:hover {
  background-color: rgb(80, 70, 70);
  color: #ffffff;
  cursor: pointer;
  }
  .update-button:hover {
  background-color: rgb(24, 144, 24);
  color: #ffffff;
  cursor: pointer;
  }
  select {
      width: 100%;
      padding: 8px 8px;
      margin: 10px 0;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
  }
</style>