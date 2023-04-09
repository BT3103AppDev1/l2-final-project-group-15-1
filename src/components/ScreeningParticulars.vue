<template>
    <div class = "particulars"> 
        <h1 id = "name">Particulars</h1><br>
        <!-- <table id = "particulars" class = "auto-index">
            <tr id = "particulars_table">
                <th>Gender:</th>
                <th>Height:</th>
                <th>Weight:</th>
                <th>Blood Type:</th>
                <th>Age:</th>
                <th>BMI:</th>
                <th>Existing Medical Conditions:</th>
            </tr>
        </table> -->
        <h3 id = "screening_gender">Gender: NIL</h3>
        <h3 id = "screening_height">Height: NIL</h3>
        <h3 id = "screening_weight">Weight: NIL</h3>
        <h3 id = "screening_blood">Blood Type: NIL</h3>
        <h3 id = "screening_age">Age: NIL</h3>
        <h3 id = "screening_bmi">BMI: NIL</h3>
        <h3 id = "screening_medcons">Existing Medical Conditions: NIL</h3>
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

            // let table = document.getElementById("particulars")
            // let row = table.insertRow(index)
            // let gender = row.insertCell(0)
            // let height = row.insertCell(1)
            // let weight = row.insertCell(2)
            // let blood_type = row.insertCell(3)
            // let age = row.insertCell(4)
            // let bmi = row.insertCell(5)
            // let med_cons = row.insertCell(6)
            let gender = document.getElementById("screening_gender")
            let height = document.getElementById("screening_height")
            let weight = document.getElementById("screening_weight")
            let blood_type = document.getElementById("screening_blood")
            let age = document.getElementById("screening_age")
            let bmi = document.getElementById("screening_bmi")
            let med_cons = document.getElementById("screening_medcons")


            gender.innerHTML = "Gender: " + user_gender
            height.innerHTML = "Height: " + user_height
            weight.innerHTML = "Weight: " + user_weight
            blood_type.innerHTML = "Blood Type: " + user_blood_type
            age.innerHTML = "Age: " + user_age
            bmi.innerHTML = "BMI: " + user_bmi.toFixed(1)
            med_cons.innerHTML = "Existing Medical Conditions: " + user_med_cons

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
tr, td {
    padding: 10px;
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

h3{
    text-align: center;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
}

</style>