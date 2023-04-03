<template>
    <div>
      <UpdateParticulars />
      <!-- <button @click="goToHomePage">Return to Home Page</button> -->
    </div>
  </template>
  
  <script>
  import UpdateParticulars from '@/components/UpdateParticulars.vue'
  
  export default {
    name: 'UpdateParticularsView',
    components: {
      UpdateParticulars,
    },
    // methods: {
    //   goToHomePage() {
    //     this.$router.push('/')
    //   },
    // },
  }
  </script>
  