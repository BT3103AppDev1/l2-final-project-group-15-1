<template>
    <div class="navbar" >
      <div>
      </div>
      <div class="container"> 
        <h1 class="text"> PillPal </h1>
        <div class="links">
          <router-link to="/login" class="login">Log in</router-link>
          <router-link to="/register" class="register">Register</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'LandingHeader',
    props: {
      PillPal: {
        type: String,
        default: 'PillPal',
      },
      rootClassName: String,
    },
  }
  </script>
  
  <style scoped>
  .navbar {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  
  .facebook-icon {
    width: 50px;
    height: 50px;
    margin-right: var(--dl-space-space-oneandhalfunits);
  }
  .instagram-icon {
    width: 50px;
    height: 50px;
    margin-right: var(--dl-space-space-oneandhalfunits);
  }
  .twitter-icon {
    width: 50px;
    height: 50px;
  }
  .text {
    top: 10px;
    left: 40%;
    right: 40%;
    position: absolute;
    text-align: center;
  }
  .links {
    height: 50px;
    display: flex;  
    align-items: center;
    flex-direction: row;
    /* justify-content: flex-end; */
    float:right;
  }
  
  .register, .login {
    display: inline-block;
    padding: 12px 24px;
    /* border: 1px solid #4f4f4f; */
    border-radius: 4px;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    font-size: 19px;
    color: black;
    z-index: 1;
  }
  .register::before, .login::before {
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

.register::after, .login::after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #39bda7;
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
}

.register:hover::before, .login:hover::before{
    top: -35%;
    background-color: #39bda7;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.register:hover::after, .login:hover::after{
    top: -45%;
    background-color: #39bda7;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.register:hover, .login:hover {
    color: #ffffff;
    border: 1px solid #39bda7;
}
  

  </style>