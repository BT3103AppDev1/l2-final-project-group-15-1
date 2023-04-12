<script>
  import ReminderConfig from '../components/ReminderConfig.vue'
  import ReminderOverview from '../components/ReminderOverview.vue'
  import TimedAlert from '../components/TimedAlert.vue'

  
  export default {
    name: 'ReminderConfigPage',
    components: {
      ReminderConfig,
      ReminderOverview,
      TimedAlert,
    }
    // your ReminderView component logic here
  }
</script>

<template>
    <div>
      <h1>Reminder Configuration</h1>
      <ReminderOverview />
      <ReminderConfig />
      <TimedAlert />
      
    </div>
</template>
  