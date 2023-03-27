<script>
  import ReminderConfig from '../components/ReminderConfig.vue'
  import ReminderOverview from '../components/ReminderOverview.vue'
  
  export default {
    name: 'ReminderConfigPage',
    components: {
      ReminderConfig,
      ReminderOverview,
    }
    // your ReminderView component logic here
  }
</script>

<template>
    <div>
      <h1>Reminder Configuration</h1>
      <ReminderOverview />
      <ReminderConfig />
      
    </div>
</template>
  