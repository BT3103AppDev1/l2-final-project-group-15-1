<template>
    <div class="update-particulars-container"><br><br>
      <h1 class="update-particulars-heading">Update Particulars</h1><br>
      <form class="update-particulars-form">
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" placeholder="Full Name" v-model="fullName">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" placeholder="Date of Birth DD/MM/YY" v-model="dob">
        <label for="gender">Gender:</label>
        <select id="gender" name="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label for="height">Height:</label>
        <input type="text" id="height" placeholder="Height in CM" v-model="height">
        <label for="weight">Weight:</label>
        <input type="text" id="weight" placeholder="Weight in KG" v-model="weight">
        <div class="button-container">
          <button class="return-button" @click.prevent="goToHomePage()">Return to Home Page</button>
          <button class="update-button" @click.prevent="updateParticulars()">Update Particulars</button>
        </div>
      </form>
    </div>
</template>
  
<script>
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
        this.$router.push('/')
    },
    updateParticulars() { // edit firebase field names accordingly
      const user = firebase.auth().currentUser;
      if (user) {
        const db = firebase.firestore();
        db.collection('PillPal').doc(user.uid).update({
          'Name': this.fullName,
          'Date.of.Birth': this.dob,
          'Gender': this.gender,
          'Height': this.height,
          'Weight': this.weight,
        })
        .then(() => {
          window.alert('Particulars updated successfully!');
          // Redirect to home page after updating particulars
          this.$router.push('/');
        })
        .catch((error) => {
          console.error('Error updating particulars: ', error);
        });
      } else {
        console.log('No user is currently logged in.');
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