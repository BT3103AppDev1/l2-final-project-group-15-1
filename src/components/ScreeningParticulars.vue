<template>
    <div class = "particulars"> 
        <div id = "screening_particulars">
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
            <h3 id = "screening_gender">Gender: NA</h3>
            <h3 id = "screening_height">Height: NA</h3>
            <h3 id = "screening_weight">Weight: NA</h3>
            <h3 id = "screening_blood">Blood Type: NA</h3>
            <h3 id = "screening_age">Age: NA</h3>
            <h3 id = "screening_bmi">BMI: NA</h3>
            <h3 id = "screening_medcons">Existing Medical Conditions: NA</h3>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";

export default {
    mounted() {
        async function display() {
            const db = getFirestore(firebaseApp);
            const auth = getAuth(firebaseApp);
            const user = auth.currentUser;
            const USERID = user.email;
            let index = 1
            const docRef = doc(db, "PillPal", USERID)
            const docSnap = await getDoc(docRef)
            let data = docSnap.data()
            let user_name = (data.Name)
            let user_gender = (data.Gender)
            let user_height = (data.Height)
            let adj_height = user_height / 100
            let user_weight = (data.Weight)
            let user_blood_type = (data.Blood_Type)
            let user_dob = (data.Date_Of_Birth)
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

            if (user_gender) {
                gender.innerHTML = "Gender: " + user_gender
            }
            if (user_height) {
                height.innerHTML = "Height: " + user_height
            }
            if (user_weight) {
                weight.innerHTML = "Weight: " + user_weight
            }
            if (user_blood_type) {
                blood_type.innerHTML = "Blood Type: " + user_blood_type
            }
            if (user_dob) {
                let user_age = 2023 - Number(user_dob.slice(0,4))
                age.innerHTML = "Age: " + user_age
            }
            if (user_bmi) {
                bmi.innerHTML = "BMI: " + user_bmi.toFixed(1)
            }
            if (user_med_cons) {
                med_cons.innerHTML = "Existing Medical Conditions: " + user_med_cons
            }
            

            let name = document.getElementById("name")
            if (user_name) {
                name.innerHTML = user_name
            } else {
                name.innerHTML = "Please update your particulars first."
            }
            
        }
        display()
    } 
}
</script>

<style scoped>
h1 {
    text-align: center;
		color: darkblue;
		font-size:40px;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    border-collapse: separate;
    border-spacing: 20px 0;
}
tr, td {
    padding: 10px;
    
}
.particulars{
    background-color: white;
    border-radius: 20px;
    border-width: 2px;
    border-color: #ccc;
    border-style: solid;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    width: 40%;
    text-align: center;
    margin: 50px auto 50px auto;
}

h3{
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
}
#screening_particulars{
    padding: 5px;
	
}

</style>