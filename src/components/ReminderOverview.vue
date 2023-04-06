<template>
    <div>
      <table id = "table" class = "auto-index">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Reminders</th>
            <th>Taken</th>
            <th>Delete </th>
          </tr>
        </thead>
        <!-- <tbody>
          <tr v-for="(medication, index) in medicationList" :key="medication.id">
            <td>
              <input type="checkbox" v-model="checkedMedications" :value="medication.id">
            </td>
            <td>{{ medication.Medication }}</td>
            <td>{{ medication.Dosage }}</td>
            <td>{{ medication.Frequency }}</td>
            <td>{{ medication.Reminders }}</td>
          </tr>
        </tbody> -->
      </table>
      
    </div>
</template>


<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, getDoc, doc, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore'


const db = getFirestore(firebaseApp);
const userId = 'johndoe@gmail.com';


export default {

    name: 'ReminderOverview',

    data() {
        return {
            
        medicationList: [],
        checkedMedications: []
        }
    },
    mounted() {

        async function readMedication() {
            let allDocuments = await getDocs(collection(db, "PillPal", userId, "MedicationRegime"))

            let index = 1
            let table = document.getElementById("table")
            
            if (!allDocuments.empty) {

                // console.log(allDocuments)

            allDocuments.forEach((docs) => {

                let row = table.insertRow(index)

                let documentData = docs.data()
                
                let medication = (documentData.Medication)
                let dosage = (documentData.Dosage)
                let frequency = (documentData.Frequency)
                let reminders = (documentData.Reminders)    
                let taken = (documentData.Taken)   
                
                // console.log(taken)
                
                var numberOfDosesTaken = taken.length

                // console.log(numberOfDosesTaken)

                var checkbox = false

                // setTimeout(function() { alert("Reminder to take: " + medication); }, 1000);

                if (numberOfDosesTaken > 0) {
                    
                    var lastTaken = taken[taken.length - 1].toDate()

                    // console.log(numberOfDosesTaken)
                    var today = new Date();
                    var timeFromLastDose = (today.getHours() - lastTaken.getHours()) * 60 + (today.getMinutes() - lastTaken.getMinutes()) 
                    
                    var minTimeBetweenDoses = Number.MAX_SAFE_INTEGER

                    
                    var hoursBetweenDoses = parseInt(reminders.split(":")[0])
                    var minutesBetweenDoses = parseInt(reminders.split(":")[1])

                    var timeBetweenDoses = hoursBetweenDoses * 60 + minutesBetweenDoses

                    
                    if (timeBetweenDoses < minTimeBetweenDoses) {
                        var minTimeBetweenDoses = timeBetweenDoses
                    }


                    // var checkbox = false
                    
                    if (timeFromLastDose < minTimeBetweenDoses) {
                        checkbox = true
                    }
                    
                }

                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
                let cell4 = row.insertCell(4);

                let cell5 = row.insertCell(5);
                let cell6 = row.insertCell(6);

                cell0.innerHTML = index;
                cell1.innerHTML = medication;
                cell2.innerHTML = dosage;
                cell3.innerHTML = frequency;
                cell4.innerHTML = reminders;

                let takenButton = document.createElement("button")
                takenButton.id = String(medication)
                takenButton.className = "takenButton"


                if (checkbox) {
                    cell5.innerHTML = "Taken"

                } else {
                    takenButton.innerHTML = "Take Medication Now"
                    cell5.appendChild(takenButton)
                    if (taken.length > 0) {
                        taken.push(Timestamp.fromDate(new Date()))
                    } else {
                        taken = new Array(Timestamp.fromDate(new Date()))
                    }
                    
                    takenButton.onclick = async function() {

                        let takeMedication = { 
                            Medication: medication,
                            Dosage: dosage,
                            Frequency: frequency,
                            Reminders: reminders,
                            Taken: taken
                        }

                      
                        const docRef = await setDoc(doc(db, "PillPal", userId, "MedicationRegime", medication), takeMedication)
                        alert("Medication has been taken at: " + new Date())
                        location.reload()
                        
                    }
                }
                
                let deleteButton = document.createElement("button")
                deleteButton.id = String(medication)
                deleteButton.className = "deleteButton"
                deleteButton.innerHTML = "Delete"

                

                cell6.appendChild(deleteButton)
                deleteButton.onclick = function() {

                    deleteMedication(medication)
                    // alert("You are going to delete " + medication)
                    // await deleteDoc(doc(db,"PillPal", userId, "MedicationRegime", medication))

                    // console.log("Medication " + medication + " successfully deleted!")

                    // let tb = document.getElementById("table")
                    // while (tb.ariaRowSpan.length > 1) {
                    //     tb.deleteRow(1)
                    // }
                    // readMedication();
                }

                // var f = '<input type="checkbox" onchange="checkboxToggle" id="complete" value="no">';
                
                // if (checkbox) {
                //     cell5.innerHTML = "Taken";
                // } else {
                //     cell5.innerHTML = f
                // }
                


                index += 1
            })

        }
        }

        

        readMedication(),

        async function takeMedication(medication) {
            let takeMedication = { Taken: admin.firestore.TimeStamp.fromDate(new Date()) }
            const docRef = await setDoc(doc(db, "PillPal", userId, "MedicationRegime", medication), takeMedication)
        }

        async function deleteMedication(medication) {
            alert("You are going to delete " + medication)
            await deleteDoc(doc(db,"PillPal", userId, "MedicationRegime", medication))

            console.log("Medication " + medication + " successfully deleted!")

            let tb = document.getElementById("table")
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            readMedication();
        }

        
    }


       
    
  // your component logic here
    
}
</script>


  