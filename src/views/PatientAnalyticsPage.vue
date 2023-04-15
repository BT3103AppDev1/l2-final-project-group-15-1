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
    <div>
      <h1 id="patientAnalytics">Patient Analytics</h1>
      <TakeMedicationHeatMap />
      <LateMedicationConsumption />
      
    </div>
</template>

<style scoped>
#patientAnalytics {
  padding:10px;
}
</style>