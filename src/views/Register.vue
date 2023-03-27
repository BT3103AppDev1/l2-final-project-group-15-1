<template>
    <h3> Registration Page </h3>
    <RegisterComponent />
 </template>
  
 <script>
 import RegisterComponent from '../components/Register.vue';
 
 export default {
     name: "Register",
     components: {
       RegisterComponent 
     },
 
     data() {
         return {
             email: null,
             password: null,
         };
     }
 }
 </script>