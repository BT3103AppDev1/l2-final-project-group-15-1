<template>
    <div class = "home_reminders"> 
        <h1>Upcoming Reminders</h1><br>
        <h3 id = "upcoming_reminders"></h3>
            <table id = "reminder_table" class= "auto-index">
            </table>   
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";

export default {
    mounted() {
        async function display(USERID) {
            const db = getFirestore(firebaseApp);
            // const auth = getAuth(firebaseApp);
            // const user = auth.currentUser;
            // const USERID = user.email;
            let allDocuments = await getDocs(collection(db, "PillPal", USERID, "MedicationRegime"))
            let index = 0
            let table = document.getElementById("reminder_table")

            if (!allDocuments.empty) {
                allDocuments.forEach((docs) => {
                    let row = table.insertRow(index)
                    let documentData = docs.data()

                    let name = (documentData.Medication)
                    let time = (documentData.Reminders)
                    let taken = (documentData.Taken) 
                    let reminder = (documentData.Reminders) 

                    if (taken.length > 0) { 
                        var lastTaken = taken[taken.length - 1].toDate()
                        var today = new Date()
                        var timeFromLastDoseMS = (today.getTime() - lastTaken.getTime())

                        var hoursBetweenDoses = parseInt(reminder.split(":")[0])
                        var minutesBetweenDoses = parseInt(reminder.split(":")[1])

                        var timeBetweenDoses = (hoursBetweenDoses * 60 + minutesBetweenDoses) * 60 * 1000

                        if (timeFromLastDoseMS < timeBetweenDoses) {
                            let cell0 = row.insertCell(0);
                            let cell1 = row.insertCell(1);

                            cell0.innerHTML = name;
                            cell1.innerHTML = time + " hrs";

                            index += 1
                        } else {
                            let reminders = document.getElementById("upcoming_reminders")
                            reminders.innerHTML = "You have yet to take " + name + "."
                        }
                    } else {
                        let reminders = document.getElementById("upcoming_reminders")
                        reminders.innerHTML = "You have yet to take " + name + "."
                    }

                    // let cell0 = row.insertCell(0);
                    // let cell1 = row.insertCell(1);

                    // cell0.innerHTML = name;
                    // cell1.innerHTML = time + " hrs";

                    // index += 1
                })
            } else {
                let reminders = document.getElementById("upcoming_reminders")
                reminders.innerHTML = "You currently have no upcoming reminders."
            }
        }

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user.email)
                display(user.email)
                // ...
            } else {
                // User is signed out
                // ...
                
            }
        });

        
    } 
}
</script>

<style>
.home_reminders{
    background-color: rgb(132, 241, 132);
    border-radius: 20px;
    border-width: 3px;
    border-color: black;
    border-style: solid;
    width: 30%;
    text-align: center;
    margin: 50px auto 50px auto;
    padding: 10px
}
</style>