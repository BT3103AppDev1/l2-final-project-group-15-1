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
      <h1></h1>
      <br>
      <HomeParticulars /><Appointments /><UpcomingReminders /><TimedAlert />
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
</style>
