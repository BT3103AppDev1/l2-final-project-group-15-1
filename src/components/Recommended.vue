<template>
    <div class = "screenings"> 
        
        <div id = "screening_reco">
            <h1>Screening Recommendations</h1><br>
            <table id = "recommendations" class = "auto-index">
                <tr>
                    <th>Type of Screening</th>
                    <th>Frequency</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getDoc, doc } from "firebase/firestore";



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
            let height = (data.Height) / 100
            let weight = (data.Weight)
            let user_dob = (data.Date_Of_Birth)
            let age = 2023 - Number(user_dob.slice(0,4))
            let bmi = weight / (height * height)
            let med_cons = (data.Medical_Conditions)
            let condition = false
            if (med_cons) {
                condition = true
            }
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
            if ((bmi > 25 && condition) || age >= 45) {
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
                if (condition) {
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
            if (age >= 40 && age < 65 && condition) {
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
    color:black;
    font-size:40px;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: auto;
}
#screening_reco{
    background-color: white;
    border-radius: 20px;
    border-width: 2px;
    border-color: #ccc;
    border-style: solid;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    width: 40%;
    text-align: center;
    margin: 0px auto 50px auto;
    padding: 20px;
}
/* #screening_reco{
    padding: 10px;
} */

th {
    color:darkblue;
    padding:10px 20px 10px 20px;
    font-size:20px;
}
#recommendations td {
    padding: 10px;
    font-size:18px;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight:500;
}

</style>