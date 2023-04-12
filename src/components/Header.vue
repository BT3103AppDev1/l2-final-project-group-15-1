<template>
    <div id="header" v-if="showHeader()">

        <h1 id="home_header" v-on:click="goHome()">PillPal</h1>

        <div>
            <LogOutButton />
        </div>
    </div>
</template>

<script>
import LogOutButton from './LogOutButton.vue';

export default {
    methods: {
        showHeader: function () {
            return this.$route.path !== "/" && this.$route.path !== "/login" && this.$route.path !== "/register" && this.$route.path !== "/forgot-password" && this.$route.path !== "/admin";
        },
        goHome() {
            this.$router.push("/home");
        }
    },
    components: { LogOutButton }
}
</script>

<style>
#header {
    background-color: rgb(5, 214, 5);
    padding: 10px;
    color: white;
    width: 100%;
}

#home_header {
    cursor: pointer;
    padding: 10px;
}
</style>