<template>
    <div id = "display">
      <Rewards />
      <TimedAlert />
      <!-- <button @click="goToHomePage">Return to Home Page</button> -->
    </div>
</template>

<script>
    import Rewards from '../components/Rewards.vue';
    import TimedAlert from '../components/TimedAlert.vue';

    export default{
        name:'RewardsPage',
        components: {
            Rewards,
            TimedAlert,
        },
        style: {
            backgroundImage: "url('../assets/background.png')",
        },
    }
</script>

<style scoped>
.display{
    display:inline;
}
</style>