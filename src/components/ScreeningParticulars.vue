<template>
    <div class = "particulars"> 
        <h1 id = "name">Particulars</h1><br>
        <table id = "particulars" class = "auto-index">
            <tr id = "particulars_table">
                <th>Gender:</th>
                <th>Height:</th>
                <th>Weight:</th>
                <th>Blood Type:</th>
                <th>Age:</th>
                <th>BMI:</th>
                <th>Existing Medical Conditions:</th>
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
            let user_gender = (data.Gender)
            let user_height = (data.Height)
            let adj_height = user_height / 100
            let user_weight = (data.Weight)
            let user_blood_type = (data.Blood_Type)
            let user_age = (data.Age)
            let user_bmi = user_weight / (adj_height * adj_height)
            let user_med_cons = (data.Medical_Conditions)

            let table = document.getElementById("particulars")
            let row = table.insertRow(index)
            let gender = row.insertCell(0)
            let height = row.insertCell(1)
            let weight = row.insertCell(2)
            let blood_type = row.insertCell(3)
            let age = row.insertCell(4)
            let bmi = row.insertCell(5)
            let med_cons = row.insertCell(6)

            gender.innerHTML = user_gender
            height.innerHTML = user_height
            weight.innerHTML = user_weight
            blood_type.innerHTML = user_blood_type
            age.innerHTML = user_age
            bmi.innerHTML = user_bmi.toFixed(1)
            med_cons.innerHTML = user_med_cons

            let name = document.getElementById("name")
            name.innerHTML = (data.Name)
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
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    border-collapse: separate;
    border-spacing: 20px 0;
    
}
.particulars{
    background-color: rgb(132, 241, 132);
    border-radius: 20px;
    border-width: 3px;
    border-color: black;
    border-style: solid;
    width: 50%;
    text-align: center;
    margin: 50px auto 50px auto;
}

</style>