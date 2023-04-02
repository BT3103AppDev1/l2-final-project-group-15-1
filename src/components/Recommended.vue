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
            let height = (data.Height) / 100
            let weight = (data.Weight)
            let age = (data.Age)
            let bmi = weight / (height * height)
            let med_cons = (data.Medical_Conditions)
            let gender = (data.Gender)

            let table = document.getElementById("recommendations")
            
            if (age >= 18) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);
                
                type.innerHTML = "General Health"
                frequency.innerHTML = "Once A Year"
                index = index + 1
            }
            if ((bmi > 25 && med_cons[0] != "NIL") || age >= 45) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Diabetes"
                frequency.innerHTML = "Once A Year"
                index = index + 1
            }
            if (age >= 45) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Colorectal Cancer"
                frequency.innerHTML = "Once Every 5-10 Years"
                index = index + 1
            }
            if (gender == "F" && age >= 65) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Bone Density"
                frequency.innerHTML = "Once A Year"
                index = index + 1
            }
            if (gender == "F" && age >= 21) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Pap Test"
                frequency.innerHTML = "Once A Year"
                index = index + 1
            }
            if (gender == "F" && age >= 30) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "HPV Test"
                frequency.innerHTML = "Once Every 3 Years"
                index = index + 1
            }
            if (gender == "F" && age >= 21 && age < 40) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Clinical Breast Exam"
                frequency.innerHTML = "Once Every 3 Years"
                index = index + 1
            }
            if (gender == "F" && age >= 40) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Mammogram"
                frequency.innerHTML = "Once Every 1-2 Years"
                index = index + 1
            }
            if (age >= 55) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Cholesterol"
                frequency.innerHTML = "Once Every 5 Years"
                index = index + 1
            }
            if (age >= 18 && age < 40) {
                if (med_cons[0] == "NIL") {
                    let row = table.insertRow(index)
                    let type = row.insertCell(0);
                    let frequency = row.insertCell(1);

                    type.innerHTML = "Glaucoma"
                    frequency.innerHTML = "Once only"
                    index = index + 1
                } else {
                    let row = table.insertRow(index)
                    let type = row.insertCell(0);
                    let frequency = row.insertCell(1);

                    type.innerHTML = "Glaucoma"
                    frequency.innerHTML = "Once every 3-5 Years"
                    index = index + 1
                }
            }
            if (age >= 40 && age < 65 && med_cons[0] != "NIL") {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Glaucoma"
                frequency.innerHTML = "Once Every 2-4 Years"
                index = index + 1
            }
            if (age >= 65) {
                let row = table.insertRow(index)
                let type = row.insertCell(0);
                let frequency = row.insertCell(1);

                type.innerHTML = "Glaucoma"
                frequency.innerHTML = "Once Every 1-2 Years"
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
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: auto;
}
.screenings{
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