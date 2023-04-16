<template>
    <div v-if="show" class="alert">
      {{ message }}
    </div>
</template>
  
<script>

    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { collection, getDocs, getDoc, doc, deleteDoc, query, where, setDoc } from "firebase/firestore";
    import { Timestamp } from 'firebase/firestore'
    import { getAuth, onAuthStateChanged } from "firebase/auth";



    const db = getFirestore(firebaseApp);
    // const userId = 'johndoe@gmail.com';

    export default {

        name: "TimedAlert",

        data() {
            return {
                
                show: false,
                message: 'No concurrent Medication Regime',
                delay: 0x7fffffff// in milliseconds
            };
        },


        mounted() {

            async function setTimedAlert(userId) {

                let allDocuments = await getDocs(collection(db, "PillPal", userId, "MedicationRegime"))

                let index = 1

                var dict = {"delay" :  parseInt(0x7fffffff), "message" : ""}
                
                
                if (!allDocuments.empty) {

                    // console.log(allDocuments)

                   

                    allDocuments.forEach((docs) => {

                        // let row = table.insertRow(index)

                        let documentData = docs.data()
                        
                        let medication = (documentData.Medication)
                        let dosage = (documentData.Dosage)
                        let frequency = (documentData.Frequency)
                        let reminders = (documentData.Reminders)    
                        let taken = (documentData.Taken)   
                        let lag = (documentData.Lag)


                        var numberOfDosesTaken = taken.length

                        var minTimeBetweenDoses = Number.MAX_SAFE_INTEGER

                        var timeFromLastDose = null;

                        if (numberOfDosesTaken > 0) {
                            
                            var lastTaken = taken[taken.length - 1].toDate()

                            var today = new Date();
                            var timeFromLastDose = (today.getHours() - lastTaken.getHours()) * 60 * 60 + (today.getMinutes() - lastTaken.getMinutes()) * 60 + (today.getSeconds() - lastTaken.getSeconds())

                            var hoursBetweenDoses = parseInt(reminders.split(":")[0])
                            var minutesBetweenDoses = parseInt(reminders.split(":")[1])

                            var timeBetweenDoses = hoursBetweenDoses * 60 * 60 + minutesBetweenDoses * 60

                            
                            if (timeBetweenDoses < minTimeBetweenDoses) {
                                minTimeBetweenDoses = timeBetweenDoses
                            }
                            

                            if (timeFromLastDose < minTimeBetweenDoses) {
                                var timeTillNextDose = (minTimeBetweenDoses - timeFromLastDose) * 1000
                                if (timeTillNextDose < dict["delay"]) {
                                    dict["delay"] = timeTillNextDose
                                    dict["message"] = "Reminder to take " + medication
                                } 
                            } else {
                                dict["delay"] = -1
                                dict["message"] = "Reminder to take " + medication
                            }
                            
                        }

                    })

                    

                } else {
                    dict = {"delay" : -2, "message" : "No ongoing medication regimes"}
                }

                return dict
            }
    

            async function showAlert(userId) {

                
                var dict = await setTimedAlert(userId)

                // console.log(dict["delay"])

                setTimeout(() => {

                    // this.show = true;
                    if (dict["delay"] == -1) {
                        if (window.location.href.endsWith("/overview")) {
                            alert("Please take your medication and record them below.")
                        } else {
                            var result = confirm(dict["message"] + ".\nDo you want to record your comsumption now?")
                            if (result) {
                                window.location.href = "/overview"
                            } 
                        }
                    } else if (dict["delay"] == -2) {
                            // alert(dict["message"])
                    } else {
                        var result = confirm(dict["message"] + ".\nDo you want to record your consumption now?")
                        if (result) {
                            window.location.href = "/overview"
                        } 
                    } 
                }, dict["delay"]);

            }

            

            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.message = setTimedAlert(user.email)["message"]
                    showAlert(user.email)
                }
                
            });

            



            // setTimeout(() => {

            //     console.log(this.delay)
            //     this.show = true;
            //     alert(this.message)
            // }, this.delay);
        }
    }   
</script>
  
<style>
    .alert {
        background-color: #f44336;
        color: white;
        padding: 20px;
    }
</style>
  