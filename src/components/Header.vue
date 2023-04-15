<template>

    <div id = "header" v-if="showHeader()">
        <h1 id = "home_header" v-on:click="goHome()">PillPal</h1>
        <LogOutButton class = 'button'/>

    </div>
</template>

<script>

import LogOutButton from './LogOutButton.vue';


export default {
    components: {
      LogOutButton
    },
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

#header{
  display:flex;
  justify-content:space-between;
  background-color: rgb(5, 214, 5);
  padding: 10px;
  color: white;
  width: 100%;
}

#home_header{
  flex:1;
  display:flex;
  justify-content:center;
  cursor: pointer;
  padding: 10px 0px 10px 20px;
  margin-left:10%;
}

.button{
    display:flex;
    justify-content:flex-end;
    align-items:center;

}
</style>