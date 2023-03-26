<script setup>
import Popup from "../components/Popup.vue";
</script>  

<template>
    <div class ='reset-password'>
        <Popup v-if= 'popupActive' @close='close'/>
        <div class="form-wrap">
        <form class='reset' action="">
            <h2>Reset Password</h2>
            <p>Forgot password? Please enter your email</p>   
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder = "Email" v-model="email"/>
                </div>
            </div>

            <button>Reset Password</button> 
        </form>
        </div>
    </div>
</template>

<script>

export default {
    name:'ForgotPassword',
    data(){
        return {
            email:null,
            popupActive:null,
            popupMessage:"",
        }
    },

    methods:{
        close(){
            this.popupActive = !this.popupActive;
            this.email = '';
        }
    }
}
</script>

<style scoped>
.reset-password {
    position:relative;
    .form-wrap {
        .reset {
            h2{
                margin-bottom:8px;
            }
        }
    }
}
</style>   