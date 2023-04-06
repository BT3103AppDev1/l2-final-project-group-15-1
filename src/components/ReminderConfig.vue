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

const db = getFirestore(firebaseApp);
const userId = 'johndoe@gmail.com';


export default {

    name: 'ReminderConfig',

    // data() {
    //     return {
            
    //     medicationList: [],
    //     checkedMedications: []
    //     }
    // },
    // created() {
    //     const userId = 'johndoe@gmail.com'
    //     const medicationRef = collection(db, "PillPal")

        
    //     const docRef = doc(db, "PillPal", userId);
    //     const docSnap = getDoc(docRef);
    //     console.log("Document data:", docSnap.data())

    //     medicationRef.on('johndoe@gmail.com', snapshot => {
    //     const medicationData = snapshot.val()

    //     const medicationList = []
    //     for (let id in medicationData) {
    //         medicationList.push({
    //         id: id,
    //         name: medicationData[id].Medication,
    //         dosage: medicationData[id].Dosage,
    //         frequency: medicationData[id].Frequency,
    //         reminders: medicationData[id].Reminders
    //         })
    //     }

    //     this.medicationList = medicationList
    //     })
    // },
    methods: {

        // async function readMedication() {
        //     let allDocuments = await getDocs(collection(db, "PillPal", userId, "MedicationRegime"))

        //     let index = 1
        //     let table = document.getElementById("table")
        //     let row = table.insertRow(index)

        //     allDocuments.forEach((docs) => {

        //         let documentData = docs.data()
                
        //         let medication = (documentData.Medication)
        //         let dosage = (documentData.Dosage)
        //         let frequency = (documentData.Frequency)
        //         let reminders = (documentData.Reminders)            

        //         let cell0 = row.insertCell(0);
        //         let cell1 = row.insertCell(1);
        //         let cell2 = row.insertCell(2);
        //         let cell3 = row.insertCell(3);
        //         let cell4 = row.insertCell(4)

        //         cell0.innerHTML = index;
        //         cell1.innerHTML = medication;
        //         cell2.innerHTML = dosage;
        //         cell3.innerHTML = frequency;
        //         cell4.innerHTML = reminders;

        //         index += 1
        //     })
        // }

        // readMedication(),

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
                Taken: {}
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


  