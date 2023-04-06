<script>
    import HomeNav from '../components/HomeNav.vue'
    import HomeParticulars from '../components/HomeParticulars.vue';
    import Appointments from '../components/Appointments.vue';

    export default {

        name: 'HomePage',
        components: {
            HomeNav,
            HomeParticulars,
            Appointments,
        }
    }

</script>

<template>
    <div>
      <h1>Home View</h1>
      <HomeNav />
      <br><br>
      <HomeParticulars /><Appointments />
      <!-- rest of the content -->
    </div>
</template>

