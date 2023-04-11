<template>
    <div id = "header" v-if="showHeader()">
        <h1 id = "home_header" v-on:click="goHome()">PillPal</h1>
    </div>
</template>

<script>
export default {
    methods: {
    showHeader: function() {
        return this.$route.path !== '/' && this.$route.path !== "/login" && this.$route.path !== "/register" && this.$route.path !== "/forgot-password" && this.$route.path !== "/admin"
    },
    goHome() {
            this.$router.push('/home')
        }
    }
}
</script>

<style>
#header{
  background-color: rgb(5, 214, 5);
  padding: 10px;
  color: white;
  width: 100%;
}

#home_header{
  cursor: pointer;
  padding: 10px;
}
</style>