<script>
    // import HomeNav from '../components/HomeNav.vue'
    import HomeParticulars from '../components/HomeParticulars.vue';
    import Appointments from '../components/Appointments.vue';
    import UpcomingReminders from '../components/UpcomingReminders.vue';
    import TimedAlert from '../components/TimedAlert.vue';

    export default {

        name: 'HomePage',
        components: {
            HomeParticulars,
            Appointments,
            UpcomingReminders,
            TimedAlert,
        }
    }

</script>

<template>
  <div class="background">
      <div class="content">
      <div class="left-panel">
        <HomeParticulars />
      </div>
      <div class="right-panel">
        <UpcomingReminders />
        <Appointments />
      </div>
      </div>
    <TimedAlert />
      <!-- rest of the content -->
  </div>
</template>

<style scoped>
.background{
  
  background-image: url('../assets/after-login-page.jpg');
  background-position:center ;
  background-repeat: no-repeat;
  background-size:cover;
  min-height:100vh;

}

.content {
  display: flex;
  justify-content: space-between;
}

.left-panel {
  flex-basis: 50%;
}

.right-panel {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
