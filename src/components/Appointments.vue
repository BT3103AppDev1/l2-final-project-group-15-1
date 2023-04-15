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

<style scoped>
h1 {
    text-align: center;
    padding: 20px;
    font-size:40px;
}

h3{
    color:darkblue;
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