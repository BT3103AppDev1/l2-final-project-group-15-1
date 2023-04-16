<script>
  import TakeMedicationHeatMap from '../components/TakeMedicationHeatMap.vue'
  import LateMedicationConsumption from '../components/LateMedicationConsumption.vue'
  import TimedAlert from '../components/TimedAlert.vue';
  
  export default {
    name: 'PatientAnalyticsPage',
    components: {
      TakeMedicationHeatMap,
      LateMedicationConsumption,
      TimedAlert,
      
    }
    // your ReminderView component logic here
  }
</script>

<template>
    <div id="display">
      <TakeMedicationHeatMap />
      <LateMedicationConsumption />
      <TimedAlert />
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