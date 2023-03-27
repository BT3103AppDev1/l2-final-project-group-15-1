<template>
    <div class = "screenings"> 
        <h1>Screening Recommendations</h1><br>
        <table id = "recommendations" class = "auto-index">
            <tr>
                <th>Type of Screening</th>
                <th>Frequency</th>
            </tr>
        </table>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const USERID = "johndoe@gmail.com"

export default {
    mounted() {
        async function display() {
            let index = 1
            const docRef = doc(db, "PillPal", USERID)
            const docSnap = await getDoc(docRef)
            let data = docSnap.data()
            let height = (data.Height)
            let weight = (data.Weight)
            let age = (data.Age)
            let bmi = weight / (height * height)

            let table = document.getElementById("recommendations")
            
            if (age > 18) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);
                
                type.innerHTML = "General Health"
                frequency.innerHTML = "Once A Year"
                index = index + 1
            }
            if (bmi > 25) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Obesity"
                frequency.innerHTML = "Once A Year"
                index = index + 1
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
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}
.screenings{
    background-color: rgb(132, 241, 132);
    border-radius: 5px;
    border-width: 3px;
    border-color: black;
    border-style: solid;
    width: 50%;
    text-align: center;
    margin: 50px auto 50px auto;
    
}
</style>