<script>
  import TakeMedicationHeatMap from '../components/TakeMedicationHeatMap.vue'
  import LateMedicationConsumption from '../components/LateMedicationConsumption.vue'
  
  export default {
    name: 'PatientAnalyticsPage',
    components: {
      TakeMedicationHeatMap,
      LateMedicationConsumption,
     
    }
    // your ReminderView component logic here
  }
</script>

<template>
    <div id="display">
      <TakeMedicationHeatMap />
      <LateMedicationConsumption />
      
    </div>
</template>

<style scoped>


#display{
  
  background-image: url('../assets/after-login-page.jpg');
  background-position:center ;
  background-repeat: no-repeat;
  background-size:cover;
  min-height:90vh;

}
</style>