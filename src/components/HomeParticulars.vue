<template>
    <div class = "home_particulars"> 
        <h1 id = "home_name">Particulars</h1><br>
        <table id = "home_particulars" class = "auto-index">
            <tr id = "home_particulars_table">
                <th>Gender:</th>
                <th>Date of Birth:</th>
                <th>Reward Points:</th>
            </tr>
        </table>
        <br>
        <button id = "update_particulars_button" v-on:click="editParticulars">Update Particulars</button>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const USERID = "johndoe@gmail.com"

export default {
    methods: {
        editParticulars() {
            this.$router.push('/particulars')
        }
    },
    mounted() {
        async function display() {
            let index = 1
            const docRef = doc(db, "PillPal", USERID)
            const docSnap = await getDoc(docRef)
            let data = docSnap.data()
            let user_gender = (data.Gender)
            let user_dob = (data.Date_Of_Birth)
            let user_points = (data.Reward_Points)

            let table = document.getElementById("home_particulars")
            let row = table.insertRow(index)
            let gender = row.insertCell(0)
            let dob = row.insertCell(1)
            let points = row.insertCell(2)

            gender.innerHTML = user_gender
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            let birth_date = ""
            if (user_dob[0] == "0") {
                birth_date += user_dob[1]
            } else {
                birth_date += user_dob.slice(0, 2)
            }
            birth_date += " "
            if (user_dob[3] == "0") {
                birth_date += months[Number(user_dob[4]) - 1]
            } else {
                birth_date += months[Number(user_dob.slice(3, 5)) - 1]
            }
            birth_date += " "
            if (user_dob[6] == 0) {
                birth_date += "200"
                birth_date += user_dob[7]
            } else {
                year = user_dob.slice(6)
                if (int(year) <= 23) {
                    birth_date += "20"
                    birth_date += year
                } else {
                    birth_date += "19"
                    birth_date += year
                }
            }
            dob.innerHTML = birth_date
            points.innerHTML = user_points

            let name = document.getElementById("home_name")
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
.home_particulars{
    background-color: rgb(132, 241, 132);
    border-radius: 20px;
    border-width: 3px;
    border-color: black;
    border-style: solid;
    width: 30%;
    text-align: center;
    margin: 50px auto 50px auto;
}

#update_particulars_button{
    background-color: white;
    margin-bottom: 10px;
    padding: 3px;
}

</style>