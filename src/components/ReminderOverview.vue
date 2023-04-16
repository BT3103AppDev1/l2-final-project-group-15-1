<template>
    <div class="container">
    	<h1>Reminder Configuration</h1>
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
import { getFirestore, increment, updateDoc } from "firebase/firestore";
import { collection, getDocs, getDoc, doc, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const db = getFirestore(firebaseApp);



export default {

    name: 'ReminderOverview',

    data() {
        return {
            
        medicationList: [],
        checkedMedications: []
        }
    },
    mounted() {

        

        async function setTimedAlert(userId) {

          let allDocuments = await getDocs(collection(db, "PillPal", userId, "MedicationRegime"))

          let index = 1

          var dict = {"delay" :  parseInt(0x7fffffff), "message" : ""}


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
                  let lag = (documentData.Lag)


                  var numberOfDosesTaken = taken.length

                  var minTimeBetweenDoses = Number.MAX_SAFE_INTEGER

                  var timeFromLastDose = null;

                  if (numberOfDosesTaken > 0) {
                      
                      var lastTaken = taken[taken.length - 1].toDate()

                      var today = new Date();
                      var timeFromLastDose = (today.getHours() - lastTaken.getHours()) * 60 * 60 + (today.getMinutes() - lastTaken.getMinutes()) * 60 + (today.getSeconds() - lastTaken.getSeconds())

                      var hoursBetweenDoses = parseInt(reminders.split(":")[0])
                      var minutesBetweenDoses = parseInt(reminders.split(":")[1])

                      var timeBetweenDoses = hoursBetweenDoses * 60 * 60 + minutesBetweenDoses * 60

                      
                      if (timeBetweenDoses < minTimeBetweenDoses) {
                          minTimeBetweenDoses = timeBetweenDoses
                      }
                      

                      if (timeFromLastDose < minTimeBetweenDoses) {
                          var timeTillNextDose = (minTimeBetweenDoses - timeFromLastDose) * 1000
                          if (timeTillNextDose < dict["delay"]) {
                              dict["delay"] = timeTillNextDose
                              dict["message"] = "Reminder to take " + medication
                          } 
                      } else {
                          dict["delay"] = -1
                          dict["message"] = "Reminder to take " + medication
                      }
                      
                  }

              })

              

          } else {
              dict = {"delay" : -2, "message" : "No ongoing medication regimes"}
          }

          return dict
          }


          async function showAlert(userId, medication) {


            var dict = await setTimedAlert(userId)

            // console.log(dict["delay"])

            setTimeout(() => {

                // this.show = true;
                if (dict["delay"] == -1) {
                    // alert("You have yet to take your medications")
                   
                } else if (dict["delay"] == -2) {
                        // no ongoing medicatio
                } else {
                    var result = confirm(dict["message"] + ".\nDo you want to record your consumption now?")
                    if (result) {
                      window.location.href = "/overview"
                    } 
                } 
            }, dict["delay"]);

          }

          async function readMedication(userId) {

            // const db = getFirestore(firebaseApp);
            // const auth = await getAuth(firebaseApp);
            // const user = auth.currentUser;
            // const userId = user.email;

            // console.log(userId)

            let allDocuments = await getDocs(collection(db, "PillPal", userId, "MedicationRegime"))

            let index = 1
            let table = document.getElementById("table")

            if (!allDocuments.empty) {

                  // console.log(allDocuments)
              console.log(table.rows.length)
              if (table.rows.length <= 1) {


                allDocuments.forEach((docs) => {

                    let row = table.insertRow(index)

                    let documentData = docs.data()
                    
                    let medication = (documentData.Medication)
                    let dosage = (documentData.Dosage)
                    let frequency = (documentData.Frequency)
                    let reminders = (documentData.Reminders)    
                    let taken = (documentData.Taken)   
                    let lag = (documentData.Lag)
                    
                    // console.log(taken)
                    
                    var numberOfDosesTaken = taken.length

                    // console.log(numberOfDosesTaken)

                    var checkbox = false

                    var minTimeBetweenDoses = Number.MAX_SAFE_INTEGER

                    var timeFromLastDose = null;

                    // setTimeout(function() { alert("Reminder to take: " + medication); }, 1000);

                    if (numberOfDosesTaken > 0) {
                        
                        var lastTaken = taken[taken.length - 1].toDate()

                        // console.log(numberOfDosesTaken)
                        var today = new Date();

                        // var timeFromLastDose = (today.getHours() - lastTaken.getHours()) * 60 + (today.getMinutes() - lastTaken.getMinutes()) 
                        var timeFromLastDose = (today.getTime() - lastTaken.getTime()) / (1000 * 60)
                        // timeFromLastDose = Math.ceil(timeFromLastDose)

                        // minTimeBetweenDoses = Number.MAX_SAFE_INTEGER

                        
                        var hoursBetweenDoses = parseInt(reminders.split(":")[0])
                        var minutesBetweenDoses = parseInt(reminders.split(":")[1])

                        var timeBetweenDoses = hoursBetweenDoses * 60 + minutesBetweenDoses

                        
                        if (timeBetweenDoses < minTimeBetweenDoses) {
                            minTimeBetweenDoses = timeBetweenDoses
                        }


                        // var checkbox = false
                        
                        if (timeFromLastDose < minTimeBetweenDoses) {
                            checkbox = true
                            // console.log(timeFromLastDose, minTimeBetweenDoses)
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
                    takenButton.classList.add()


                    if (checkbox) {
                        cell5.innerHTML = "Taken"

                    } else {
                        takenButton.innerHTML = "Take Medication Now"
                        cell5.appendChild(takenButton)
                        if (taken.length > 0) {
                            taken.push(Timestamp.fromDate(new Date()))
                            var lagMin = timeFromLastDose - minTimeBetweenDoses
                            lag.push(lagMin)
                            if (lagMin <= 60) {
                              updateDoc(doc(db, "PillPal", userId), {
                                Reward_Points: increment(3),
                              })
                            }
                        } else {
                            taken = new Array(Timestamp.fromDate(new Date()))
                            lag = new Array()
                            updateDoc(doc(db, "PillPal", userId), {
                                Reward_Points: increment(3),
                              })
                            // lag.push(0)
                        }
                        
                        takenButton.onclick = async function() {

                            let takeMedication = { 
                                Medication: medication,
                                Dosage: dosage,
                                Frequency: frequency,
                                Reminders: reminders,
                                Taken: taken,
                                Lag: lag
                            }

                          
                            const docRef = await setDoc(doc(db, "PillPal", userId, "MedicationRegime", medication), takeMedication)
                            alert("Medication has been taken at: " + new Date())
                            if (reminders != "00:00") {
                              cell5.innerHTML = "Taken"
                            }
                            // location.reload()
                            showAlert(userId, medication)
                            

                            
                        }
                    }
                    
                    let deleteButton = document.createElement("button")
                    deleteButton.id = String(medication)
                    deleteButton.className = "deleteButton"
                    deleteButton.innerHTML = "Delete"

                    

                    cell6.appendChild(deleteButton)
                    deleteButton.onclick = async function() {

                      // deleteMedication(medication)
                      alert("You are going to delete " + medication)
                      await deleteDoc(doc(db,"PillPal", userId, "MedicationRegime", medication))

                      console.log("Medication " + medication + " successfully deleted!")

                      let tb = document.getElementById("table")
                    
                      // tb.deleteRow(index)
                     
                      while (tb.rows.length > 1) {
                          tb.deleteRow(1)
                      }
                      readMedication(userId)
                      // location.reload();
                      
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
            }

            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
            if (user) {
                readMedication(user.email)
                // ...
            } else {
                // User is signed out
                // ...
            }
            });




        // async function takeMedication(medication) {
        //     let takeMedication = { Taken: admin.firestore.TimeStamp.fromDate(new Date()) }
        //     const docRef = await setDoc(doc(db, "PillPal", userId, "MedicationRegime", medication), takeMedication)
        // }

        // async function deleteMedication(medication, userId) {
        //     alert("You are going to delete " + medication)
        //     await deleteDoc(doc(db,"PillPal", userId, "MedicationRegime", medication))

        //     console.log("Medication " + medication + " successfully deleted!")

        //     let tb = document.getElementById("table")
        //     while (tb.rows.length > 1) {
        //         tb.deleteRow(1)
        //     }
        //     readMedication(userId);
        // }
    
    // }
        
    }


       
    
  // your component logic here
    
}
</script>

<style scoped>
h1{
	margin:20px;
}
.container{
    background-color: white;
    border-radius: 20px;
    border-width: 2px;
    border-color: #ccc;
    border-style: solid;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    width: 70%;
    text-align: center;
    margin: 50px auto 50px auto;
		padding-bottom:50px;
}

.takenButton {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

.deleteButton {
  background-color: #f44336; 
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
</style>


  