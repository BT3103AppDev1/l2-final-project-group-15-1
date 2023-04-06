<script>
  import TakeMedicationHeatMap from '../components/TakeMedicationHeatMap.vue'
  
  export default {
    name: 'PatientAnalyticsPage',
    components: {
      TakeMedicationHeatMap,
     
    }
    // your ReminderView component logic here
  }
</script>

<template>
    <div>
      <h1>Patient Analytics</h1>
      <TakeMedicationHeatMap />
      
    </div>
</template>