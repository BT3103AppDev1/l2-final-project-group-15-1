<template>
    <div style="text-align:center;">
        <br>
        <h1 id="mainHead"> Login to PillPal </h1>
        <br>
        <form class='login' action="">
            <p class="login-register"> 
                Don't have an account? |
                <router-link class="router-link" :to= "{name: 'Register'}"> Register </router-link>
            </p>
            <div id="firebaseui-auth-container"> </div>
            <router-link class="forgot-password" :to= "{name: 'ForgotPassword'}"> Forgot Password? </router-link>
            <!-- <button> Sign In </button> -->
        </form>
    </div>
</template>
 
<script>
import firebase from '@/uifire.js';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default {
    name: "Login",

    mounted() {
        //calling the ui instance
        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            // We need to create the instance only one time
            //To initializae the firebaseUI Widget using Firebase
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
            signInSuccessUrl: '/home',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ]
        };
        ui.start("#firebaseui-auth-container", uiConfig)
    }
}
</script>
 
<style scoped>
.form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;


}

.login-register {
    margin-bottom: 32px;
    color: black;
}

.router-link {
    color: green;
}

form {
    padding: 0 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1
}

h2 {
    text-align: center;
    font-size: 32px;
    color: lightblue;
    margin-bottom: 40px;
}

.forgot-password {
    text-decoration: none;
    color: green;
    cursor: pointer;
    font-size: 14px;
    margin: 32px 0;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;
}

:hover {
    border-color: grey;
}

.inputs {
    width: 100%;
    max-width: 350px;
}
</style>            