<template>
   <LoginComponent />
</template>
 
<script>
import LoginComponent from '../components/Login.vue';

export default {
    name: "Login",
    components: {
      LoginComponent 
    },

    data() {
        return {
            email: null,
            password: null,
        };
    }
}
</script>