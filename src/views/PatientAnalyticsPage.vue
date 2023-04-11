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
      <h1>Patient Analytics</h1>
      <TakeMedicationHeatMap />
      <LateMedicationConsumption />
      
    </div>
</template>