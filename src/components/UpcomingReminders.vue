<template>
    <div class = "home_reminders"> 
        <h1>Upcoming Reminders</h1><br>
            <table id = "reminder_table" class= "auto-index">

            </table>   
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const USERID = "johndoe@gmail.com"

export default {
    mounted() {
        async function display() {
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

                    index += 1
                })
            }
        }
        display()
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