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
    <div class="background">
      <ReminderOverview />
      <ReminderConfig />
      <TimedAlert />
      
    </div>
</template>
  
<style scoped>
.background {
  background-image: url('../assets/after-login-page.jpg');
  background-position:center ;
  background-repeat: no-repeat;
  background-size:cover;
  min-height:100vh;
}
</style>