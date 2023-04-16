<template>
    <div class ="container">
        <form id="myform" onsubmit="return false">
        
            <div class = "formli">
                <h1>Add/Edit Medication</h1>
                <div class ='formpart'>
                    <label for = "medication">Medication:</label>    
                    <input type = "text" id = "medication" required = "" placeholder = "Enter your Medication name" size="30"> <br><br>
                </div>

                <div class ='formpart'>
                    <label for = "dosage">Dosage:</label>    
                    <input type = "text" id = "dosage" required = "" placeholder = "Enter Dosage:(ml, cups, etc.)" size="30"> <br><br>
                </div>

                <div class ='formpart'>
                    <label for = "frequency">Frequency:</label>    
                    <input type = "text" id = "frequency" required = "" placeholder = "Enter Frequency:(Daily, Weekly, etc.)" size="30"> <br><br>
                </div>

                <div class ='formpart'>
                    <label for = "reminders">Reminders:</label>    
                    <input type = "text" id = "reminders" required = "" placeholder = "Enter times between doses:(HH:MM)" size="30"> <br><br>
                </div>
                
                <div class = "edit_medication" >
                    <button id = "edit_button" v-on:click="editMedication">Save Changes</button>
                </div>
            </div>
        </form>
        
    </div>             
</template>


<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, getDoc, doc, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
// const userId = 'johndoe@gmail.com';


export default {

    name: 'ReminderConfig',

    
    methods: {


        checkInputFormat() {
            let medication = document.getElementById("medication").value
            let dosage = document.getElementById("dosage").value
            let frequency = document.getElementById("frequency").value
            let reminders = document.getElementById("reminders").value

            if (medication == "") {
                return "Please input medication name into Medication field."
            } else if (dosage == "") {
                return "Please input dosage."
            } else if (frequency == "") {
                return "Please input dosage frequency."
            } else if (/^([0-9][0-9]:[0-5][0-9])$/.test(reminders) == false) {
                return "Please input time between each dose in HH:MM format"
            } else {
                return ""
            }
            
        },

        async editMedication() {

            var userId;

            const auth = getAuth();
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    userId = user.email
                }
                
            });

            var errorMessage = this.checkInputFormat()
            console.log(errorMessage)

            if (errorMessage != "") {
                alert(errorMessage)
                return
            }

            let medication = document.getElementById("medication").value
            let dosage = document.getElementById("dosage").value
            let frequency = document.getElementById("frequency").value
            let reminders = document.getElementById("reminders").value

            alert("Adding/Editting Medication: " + medication)

            const newMedication = {
                Medication: medication,
                Dosage: dosage,
                Frequency: frequency,
                Reminders: reminders,
                Taken: {},
                Lag: {},
            }   

            try {
                const docRef = await setDoc(doc(db, "PillPal", userId, "MedicationRegime", medication), newMedication)
                
                // console.log(typeof docRef)
                console.log(docRef)
                // document.getElementById("myform").reset();
                // this.$emit("added")
                // location.reload()
            } catch(error) {
                console.error(error)
            }

            this.pageReload()
        },

        async pageReload() {
            location.reload()
        },

        

        
    }
  // your component logic here
}
</script>

<style scoped>

input {
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    
    font-size: 16px;
}

input.active {
  border-color: #007bff;
  transform: scale(1.1);
}

h1{
    font-size:40px;
}

label{
    font-size:18px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-weight:bold;
	color:darkblue;
	
}
.container {
    display:flex;
    justify-content:center;
    background-color: white;
    border-radius: 20px;
    border-width: 2px;
    border-color: #ccc;
    border-style: solid;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    width: 40%;
    text-align: center;
    margin: 50px auto 50px auto;
    padding: 20px;
}

.formpart {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  margin-bottom:5%;
  margin-right:5%;
  margin-left:10%;
}

label {
  margin-right: 10px;
}

button {
  cursor:pointer;
  background-color: rgb(75, 255, 75); 
  padding:6px;
  margin-left:10px;
  border-radius:10px;
  
  box-shadow: 0 0 20px -20px;
  color:black;
}

button:hover {
  background-color: lightgreen;
  box-shadow: 0px 0px 20px -18px;
  border: 2.5px solid lightgreen;
}

button:active {
  transform: scale(0.9);
}
</style>


  