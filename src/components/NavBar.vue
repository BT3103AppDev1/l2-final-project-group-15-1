<template>
    <div class ="home-nav">
      <div id="routing" v-if="showNav()">
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
export default {
    methods: {
      showNav: function() {
        return this.$route.path !== '/' && this.$route.path !== "/login" && this.$route.path !== "/register" && this.$route.path !== "/forgot-password" && this.$route.path !== "/admin"
      }
    }
  };
</script>

<style>
#home-nav{
  padding: 20px;
  width:100%;
  display: inline-block;
}

#routing{
  padding : 10px;
  display: inline-block;
}

#routing a {
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

#routing a.router-link-exact-active{
  color: white;
}
</style>