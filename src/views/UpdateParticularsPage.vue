<template>
    <div>
      <UpdateParticulars />
      <TimedAlert />
      <!-- <button @click="goToHomePage">Return to Home Page</button> -->
    </div>
  </template>
  
  <script>
  import UpdateParticulars from '@/components/UpdateParticulars.vue'
  import TimedAlert from '../components/TimedAlert.vue';
  
  export default {
    name: 'UpdateParticularsView',
    components: {
      UpdateParticulars,
      TimedAlert
    },
    // methods: {
    //   goToHomePage() {
    //     this.$router.push('/')
    //   },
    // },
  }
  </script>
  