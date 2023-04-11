<template>
    <div class = "home_appointments"> 
        <h1>Upcoming Appointments</h1><br>
        <h3 id = "upcoming"></h3>
        <table id = "appointment_table" class= "auto-index">
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

            let allDocuments = await getDocs(collection(db, "PillPal", USERID, "Appointments"))
            let index = 0
            let table = document.getElementById("appointment_table")

            if (!allDocuments.empty) {
                allDocuments.forEach((docs) => {
                    let row = table.insertRow(index)
                    let documentData = docs.data()

                    let date = (documentData.Date)
                    let location = (documentData.Location)

                    let cell0 = row.insertCell(0);
                    let cell1 = row.insertCell(1);

                    cell0.innerHTML = date;
                    cell1.innerHTML = location;

                    index += 1
                })
            } else {
                let appts = document.getElementById("upcoming")
                appts.innerHTML = "You currently have no scheduled appointments."
            }
        }
        display()
    } 
}
</script>

<style>
h1 {
    text-align: center;
}
#appointment_table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    border-collapse: separate;
}
.home_appointments{
    display: inline-block;
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