<template>
    <div class="heatmap-container">
      <calendar-heatmap  :values = "heatmapData" :end-date= "new Date()" :round="5" :max="10"  class="heatmap"/>
    </div>
  </template>
  

<script>

    import 'vue3-calendar-heatmap/dist/style.css'    
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { collection, getDocs, getDoc, doc, deleteDoc, query, where, setDoc } from "firebase/firestore";
    import { Timestamp } from 'firebase/firestore'
    import { getAuth, onAuthStateChanged } from "firebase/auth";

    import { CalendarHeatmap } from 'vue3-calendar-heatmap'

    const db = getFirestore(firebaseApp);
    // const userId = 'johndoe@gmail.com';


    export default {
        name: "TakeMedicationHeatMap",
        components: {
            CalendarHeatmap,
        },

        data() {
            return {
                heatmapData: [],
            }
        },

        mounted() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.fetchHeatmapData(user.email);
                }
                
            });
            
        },

        methods: {

            async fetchHeatmapData(userId) {

                    
                const allDocuments = await getDocs(collection(db, "PillPal", userId, "MedicationRegime"))

                var dict = {};
                var heatmapData = new Array(dictLen);

                if (!allDocuments.empty) {

                    // console.log(allDocuments)

                    allDocuments.forEach((docs) => {

                    
                        let documentData = docs.data()

                        let medication = (documentData.Medication)
                        let dosage = (documentData.Dosage)
                        let frequency = (documentData.Frequency)
                        let reminders = (documentData.Reminders)    
                        let taken = (documentData.Taken)   

                        for (var i = 0; i < taken.length; i++) {
                            var timestamp = taken[i].toDate();

                            // console.log(timestamp)

                            

                            let day = timestamp.getDate();
                            let month = timestamp.getMonth() + 1;
                            let year = timestamp.getFullYear();

                            // This arrangement can be altered based on how we want the date's format to appear.
                            let date = `${year}-${month}-${day}`;
                            // console.log(date); 


                            // heatmapData[row] = heatmapData[row] || Array.from({ length: 24 }, () => 0);
                            // heatmapData[row][col]++;
                            

                            if (date in dict) {
                                dict[date] += 1;
                            } else {
                                dict[date] = 1;
                            }

                            
                        }

                    })

                    // console.log(dict)

                    var dictLen = Object.keys(dict).length

                    var counter = 0;

                    for (const [key, value] of Object.entries(dict)) {
                        heatmapData[counter] = {date : key, count : value}
                        counter += 1;

                    }

                }

                // console.log(heatmapData)
                this.heatmapData = heatmapData;
                // console.log(this.heatmapData)
                
            }

            
        },
    
    }


</script>

<style scoped>
.heatmap-container {
  display:block;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #ccc;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-radius: 10px;
  margin: 2rem auto;
  background-color: white;
  max-width: 80%;
}

.heatmap text{
    font-size:12px;
}


</style>













