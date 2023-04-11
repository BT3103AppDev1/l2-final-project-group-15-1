<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div>
    <Header></Header>
    <NavBar></NavBar>
  </div>
</template>

<script>

import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  components: {
    Header,
    NavBar,
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
</style>


