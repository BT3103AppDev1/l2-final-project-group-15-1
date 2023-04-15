<template>
    <div id = "display">
      <Rewards />
      <!-- <button @click="goToHomePage">Return to Home Page</button> -->
    </div>
</template>

<script>
    import Rewards from '../components/Rewards.vue';

    export default{
        name:'RewardsPage',
        components: {
            Rewards,
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