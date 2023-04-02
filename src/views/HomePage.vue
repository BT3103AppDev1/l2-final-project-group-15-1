<script>
    import HomeNav from '../components/HomeNav.vue'
    import HomeParticulars from '../components/HomeParticulars.vue';

    export default {

        name: 'HomePage',
        components: {
            HomeNav,
            HomeParticulars,
        }
    }

</script>

<template>
    <div>
      <h1>Home View</h1>
      <HomeNav />
      <br><br>
      <HomeParticulars />
      <!-- rest of the content -->
    </div>
</template>

