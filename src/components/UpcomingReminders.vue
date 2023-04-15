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
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";

export default {
    mounted() {
        async function display() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth(firebaseApp);
            const user = auth.currentUser;
            const USERID = user.email;
            let allDocuments = await getDocs(collection(db, "PillPal", USERID, "MedicationRegime"))
            let index = 0
            let table = document.getElementById("reminder_table")

            if (!allDocuments.empty) {
                allDocuments.forEach((docs) => {
                    let row = table.insertRow(index)
                    let documentData = docs.data()

                    let name = (documentData.Medication)
                    let time = (documentData.Reminders)

                    let cell0 = row.insertCell(0);
                    let cell1 = row.insertCell(1);

                    cell0.innerHTML = name;
                    cell1.innerHTML = time + " hrs";
                    cell0.setAttribute("style", "padding: 0 10px; font-size:18px; font-family:Verdana, Geneva, Tahoma, sans-serif;font-weight:500;");
                    cell1.setAttribute("style", "padding: 0 10px; font-size:18px; font-family:Verdana, Geneva, Tahoma, sans-serif;font-weight:500;")
                    index += 1
                })
            } else {
                let reminders = document.getElementById("upcoming_reminders")
                reminders.innerHTML = "You currently have no upcoming reminders."
            }
        }
        display()
    } 
}
</script>

<style scoped>

h1{
    padding:20px;

}


.home_reminders{
    background-color: white;
    border-radius: 20px;
    border-width: 2px;
    border-color: #ccc;
    border-style: solid;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    width: 40%;
    text-align: center;
    margin: 50px auto 50px auto;
    min-height: 200px;
}
</style>