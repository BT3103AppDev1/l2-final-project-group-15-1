<template>
    <div id = "display">
      <ScreeningParticulars />
      <Recommended />
      <!-- <button @click="goToHomePage">Return to Home Page</button> -->
    </div>
</template>
  
<script>
  import Recommended from '../components/Recommended.vue';
  import ScreeningParticulars from '../components/ScreeningParticulars.vue';
  
  export default {
    name: 'ScreeningsPage',
    components: {
      ScreeningParticulars,
      Recommended,
    }
  }
</script>

<style>
.display{
  display: inline;
}
</style>