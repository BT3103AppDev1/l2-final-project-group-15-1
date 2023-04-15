<template>
    <div class ="container">
        <form id="myform" onsubmit="return false">
            <h2>Add/Edit Medication</h2>

            <div class = "formli">
                <label for = "medication">Medication:</label>    
                <input type = "text" id = "medication" required = "" placeholder = "Enter your Medication name"> <br><br>

                <label for = "dosage">Dosage:</label>    
                <input type = "text" id = "dosage" required = "" placeholder = "Dosage (include metric, eg. ml, cups...)"> <br><br>

                <label for = "frequency">Frequency:</label>    
                <input type = "text" id = "frequency" required = "" placeholder = "Frequency (e.g. Daily, Weekly, Monthly...)"> <br><br>

                <label for = "reminders">Reminders:</label>    
                <input type = "text" id = "reminders" required = "" placeholder = "Duration between Doses: (HH:SS format)"> <br><br>

                <div class = "edit_medication" >
                    <button id = "edit_button" v-on:click="editMedication">Add/Edit Medication</button>
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


  