<template>
    <div class ="home-nav">
      <div id="routing" v-if="showNav()">
        <!-- <router-link to="/overview" class = 'nav-link'>Full Medication/Supplement Overview</router-link> -->
        <a href="/overview" class = 'nav-link'>Full Medication/Supplement Overview</a>
        <router-link to="/rewards" class = 'nav-link'>Reward Points</router-link>
        <router-link to="/screening" class = 'nav-link'>Screening Recommendations</router-link>
        <router-link to="/analytics" class = 'nav-link'>Patient Analytics</router-link>
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
  .nav-link {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 4px;
    
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    font-size: 19px;
    color: black;
    z-index: 1;
    text-decoration: none;
  }
  .nav-link::before{
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }
  .nav-link::after {
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #ADE2DF;
  }
  .nav-link:hover::before {
    top: -35%;
    background-color: #ADE2DF;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    font-size:120%;
  }
  .nav-link:hover::after {
    top: -45%;
    background-color: #ADE2DF;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  #routing{
    background-color: rgb(182, 249, 182);
  }

/* #home-nav{
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
} */

#routing a.router-link-exact-active{
  color: darkblue;
  /* border: 4px solid black; */
  background:palegreen;
}
</style>