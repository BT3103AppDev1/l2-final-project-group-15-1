<template>
    <div id = "display">
      <ScreeningParticulars />
      <Recommended />
      <TimedAlert />
      
      <!-- <button @click="goToHomePage">Return to Home Page</button> -->
    </div>
</template>
  
<script>
  import Recommended from '../components/Recommended.vue';
  import ScreeningParticulars from '../components/ScreeningParticulars.vue';
  import TimedAlert from '../components/TimedAlert.vue';
  
  export default {
    name: 'ScreeningsPage',
    components: {
      ScreeningParticulars,
      Recommended,
      TimedAlert,
    }
  }
</script>

<style>
#display{
  
  background-image: url('../assets/after-login-page.jpg');
  background-position:center ;
  background-repeat: no-repeat;
  background-size:cover;
  min-height:100vh;

}
</style>