<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div id = "header" v-if="showNav()">
    <h1 id = "home_header" v-on:click="goHome()">PillPal</h1>
  </div>
  <div id ="nav">
    <div class="routing" v-if="showNav()">
      <router-link to="/configure">Configure Medications/Supplements</router-link>
      <router-link to="/overview">Full Medication/Supplement Overview</router-link>
      <router-link to="/rewards">Reward Points</router-link>
      <router-link to="/screening">Screening Recommendations</router-link>
      <router-link to="/analytics">Patient Analytics</router-link>
    </div>
  <router-view/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import UpdateParticulars from './components/UpdateParticulars.vue';

export default {
  name: 'app',
  methods: {
    showNav: function() {
      return this.$route.path !== '/' && this.$route.path !== "/login" && this.$route.path !== "/register" && this.$route.path !== "/forgot-password"
    },
    goHome() {
            this.$router.push('/home')
        }
  }
};

</script>

<style lang="scss">
// @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  text-align: center;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

body, html {
  margin:0;
  padding:0;
  width: 100%;
}

#header{
  background-color: rgb(5, 214, 5);
  padding: 10px;
  color: white;
}

#home_header{
  cursor: pointer;
  padding: 10px;
}

.routing{
  padding: 20px;
  width:100%;
}

#nav{
  padding : 10px;
}

#nav a {
  font-weight : bold;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(169, 248, 169);
  margin: 20px;
  border-radius: 2px;
  border: 1px;
  border-color: black;
  border-style: solid;
  padding: 5px;
  display: inline-block;
}

#nav a.router-link-exact-active{
  color: white;
}

h1{
  padding-top: 10px;
}
</style>


