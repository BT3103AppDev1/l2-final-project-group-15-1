<template>
    <div class = "home_particulars"> 
        <h1 id = "home_name">Please update your particulars.</h1><br>
        <!-- <table id = "home_particulars" class = "auto-index">
            <tr id = "home_particulars_table">
                <th>Gender:</th>
                <th>Date of Birth:</th>
                <th>Reward Points:</th>
            </tr>
        </table> -->
        <div class = "home_details">
            <h3 id = "home_gender">Gender: NA</h3>
            <h3 id = "home_dob">Date of Birth: NA</h3>
            <h3 id = "home_rewards">Reward Points: 0</h3>
        </div>
        <button id = "update_particulars_button" v-on:click="editParticulars">Update Particulars</button>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getDoc, doc } from "firebase/firestore";




export default {
    methods: {
        editParticulars() {
            this.$router.push('/particulars')
        },    
    },
    mounted() {
        async function display(USERID) {
            const db = getFirestore(firebaseApp);
            // const auth = getAuth(firebaseApp);
            // const user = auth.currentUser;
            // const USERID = user.email;
            let index = 1
            const docRef = doc(db, "PillPal", USERID)
            const docSnap = await getDoc(docRef)
            let data = docSnap.data()
            let user_gender = (data.Gender)
            let user_dob = (data.Date_Of_Birth)
            let user_points = (data.Reward_Points)

            // let table = document.getElementById("home_particulars")
            // let row = table.insertRow(index)
            // let gender = row.insertCell(0)
            // let dob = row.insertCell(1)
            // let points = row.insertCell(2)

            // gender.innerHTML = user_gender
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            let birth_date = ""
            if (user_dob[8] == "0") {
                birth_date += user_dob[9]
            } else {
                birth_date += user_dob.slice(8)
            }
            birth_date += " "
            if (user_dob[5] == "0") {
                birth_date += months[Number(user_dob[6]) - 1]
            } else {
                birth_date += months[Number(user_dob.slice(5, 7)) - 1]
            }
            birth_date += " "
            birth_date += user_dob.slice(0,4)
            

            let name = document.getElementById("home_name")
            name.innerHTML = (data.Name)
            let gender = document.getElementById("home_gender")
            gender.innerHTML = "Gender: " + user_gender
            let dob = document.getElementById("home_dob")
            dob.innerHTML = "Date of Birth: " + birth_date
            let points = document.getElementById("home_rewards")
            if (user_points) {
                points.innerHTML = "Reward Points: " + user_points
            }
            
        }

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                display(user.email)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
        
    } 
}
</script>

<style scoped>
h1 {
    text-align: center;
    color:darkblue;
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
    background-color: white;
    border-radius: 20px;
    border-width: 2px;
    border-color: #ccc;
    border-style: solid;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    width: 80%;
    text-align: center;
    margin: 50px auto 50px auto;
	padding:20px;
}

h3{
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
}

button {
  margin-top:10px;
  cursor:pointer;
  background-color: rgb(75, 255, 75); 
  padding:6px;
  margin-left:10px;
  border-radius:10px;
  box-shadow: 0 0 20px -20px;
  color:black;
}

button:hover {
  background-color: lightgreen;
  box-shadow: 0px 0px 20px -18px;
  border: 2.5px solid lightgreen;
}

button:active {
  transform: scale(0.9);
}

</style>