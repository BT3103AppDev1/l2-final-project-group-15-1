<template>
    <div>
      <p id = "averageTT"> Average Time Taken: {{ averageTimeTaken }} min</p>
      <p id = "lateConsumption"> Missed Medications: {{ lateConsumptions }}</p>
    </div>
</template>
  
<script>
    import { computed, onMounted, ref } from 'vue';
    import { collection } from 'firebase/firestore';
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { getDocs, getDoc, doc, deleteDoc, query, where, setDoc } from "firebase/firestore";
    import { Timestamp } from 'firebase/firestore'
    import TakeMedicationHeatMap from './TakeMedicationHeatMap.vue';
    import { getAuth, onAuthStateChanged } from "firebase/auth";


    const db = getFirestore(firebaseApp);
    // const userId = 'johndoe@gmail.com';

    // const auth = getAuth();
    // var userId = onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         return user.email
    //     } 
    // });
  
    export default {
        name: "LateMedicationConsumption",
        props: {
        // db: {
        //     type: Object,
        //     required: true
        // },
        // medicationCollection: {
        //     type: Int32Array,
        //     required: true
        // }
        },
        
        setup(props) {
        


        },

        data() {
            return {
                averageTimeTaken: "NA",
                lateConsumptions:"NA"
            }
        },

        mounted() {

            var consumptionTimes = new Array();
            var reminders = ref([]);
            var taken = ref([]);

            async function fetchData(userId) {

                var counter = 0
                var total = 0;
                var counts = 0;
                var totalMissedCounts = 0;

                let allDocuments = await getDocs(collection(db, "PillPal", userId, "MedicationRegime"))

                allDocuments.forEach((doc) => {
                    // consumptionTimes[counter] = doc.data().Lag
                    // reminders[counter] = doc.data().Reminders
                    // taken[counter] = doc.data().Taken

                    // counter += 1
                    const subtotal = doc.data().Lag.reduce((acc, val) => acc + val);
                    total += subtotal

                    const subcount = doc.data().Lag.reduce((acc, val) => acc + 1) + 1
                    counts += subcount

                    var reminderHour = doc.data().Reminders.split(":")[0]
                    var reminderMin = doc.data().Reminders.split(":")[1]

                    var timeBetweenDoses = parseInt(reminderHour) * 60 + parseInt(reminderMin)
                    var timeSinceFirstDose = new Date().getTime() / 1000 - doc.data().Taken[0]["seconds"]

                    var diff = timeSinceFirstDose / 60 - timeBetweenDoses * subcount
                    var missedCounts = diff / (timeBetweenDoses)

                    totalMissedCounts += missedCounts

                });

                document.getElementById("averageTT").innerHTML = "Average time taken to record consumption: " + total / counts + " min";
                document.getElementById("lateConsumption").innerHTML = "Number of missed doses: " + totalMissedCounts;

            }

           

            // async function averageTimeTakenFunc() {

            //     var total = 0;
            //     var counts = 0;

            //     // console.log(consumptionTimes['0'])
            //     for (var i = 0; i < consumptionTimes.length; i++) {
            //         const subtotal = consumptionTimes[i].reduce((acc, val) => acc + val);
            //         total += subtotal

            //         const subcount = consumptionTimes[i].reduce((acc, val) => acc + 1) + 1
            //         counts += subcount
            //     }

            //     // console.log(consumptionTimes)
  
            //     document.getElementById("averageTT").innerHTML = total / counts;
                
            // };

            // async function lateConsumptionsFunc() {
            //     var totalMissedCounts = 0;
            
            //     for (var i = 0; i < consumptionTimes.length; i++) {
            //         const subtotal = consumptionTimes[i].reduce((acc, val) => acc + val);
            //         // total += subtotal
            //         const subcount = consumptionTimes[i].reduce((acc, val) => acc + 1) + 1
            //         // counts += subcount

            //         var reminderHour = reminders[i].split(":")[0]
            //         var reminderMin = reminders[i].split(":")[1]

            //         var timeBetweenDoses = parseInt(reminderHour) * 60 + parseInt(reminderMin)
            //         var timeSinceFirstDose = new Date().getTime() / 1000 - taken[i][0]["seconds"]

            //         var diff = timeSinceFirstDose / 60 - timeBetweenDoses * subcount
            //         var missedCounts = diff / (timeBetweenDoses)

            //         totalMissedCounts += missedCounts
                    
            //     }
            //     return totalMissedCounts
            // };


            const auth = getAuth();

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    fetchData(user.email)
                }
                
            });


            

            
        }

    };
</script>
  