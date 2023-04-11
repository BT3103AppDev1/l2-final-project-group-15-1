<!-- <template>
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
</script> -->

<template>
    <div class="form-wrap">
        <form class="login">

            <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
            </p>

            <h2> Login to PillPal </h2>

            <div class="inputs">

                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                </div>

                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                </div>

                <br>

                <div v-show="error" class="error">{{ this.errorMsg }} </div>

            </div>

            <br>

            <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">Forgot your password?</router-link>

            <br>

            <button @click.prevent="login"> Login </button>

            <div class="angle"></div>
        </form>

        <div class="background"></div>

    </div>
</template>
  
<script>
import { signInWithEmailAndPassword, getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import firebaseApp from '@/firebase.js';
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebaseApp)

export default {

    name: "Login",
    components: {},
    data() {
        return {
            email: '',
            password: '',
            error: '',
            errorMsg: '',
        }
    },
    methods: {
        async login() {
            const current_email = this.email;
            const current_pw = this.password;
            if (current_email.length === 0 || current_pw.length === 0) {
                this.errorMsg = "Please enter both Email and Password";
                this.error = true;
            } else {
                const numOfSignIn = await fetchSignInMethodsForEmail(auth, current_email)
                const result = numOfSignIn
                if (result.length === 0) {
                    this.errorMsg = "User has not been registered"
                    this.error = true;
                } else {
                    try {
                        const signedUser = await signInWithEmailAndPassword(auth, current_email, current_pw)
                        const user = signedUser
                        this.$router.push({ name: "HomePage" });
                        this.error = false;
                        this.errorMsg = "";
                    } catch (err) {
                        this.errorMsg = "Invalid password Entered";
                        this.error = true;
                    }
                }
            }
        },
    },
};
</script>
  
<style lang="scss">
.form-wrap {
    background: repeating-linear-gradient(rgba(240, 235, 244, 1),
            rgba(161, 195, 209, 0.75),
            rgba(241, 114, 161, 0.5));
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;

    @media(min-width: 900px) {
        width: 100%;
    }

    .login-register {
        margin-bottom: 32px;

        .router-link {
            color: #000;
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;

        @media(min-width:900px) {
            padding: 0 50px;
        }

        h2 {
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;

            @media(min-width: 900px) {
                font-size: 40px;
            }
        }

        .inputs {
            width: 100%;
            max-width: 350px;

            .input {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;

                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }

                }

                .icon {
                    width: 12px;
                    position: absolute;
                    left: 6px;
                }
            }
        }

        .forgot-password {
            text-decoration: none;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0 32;
            border-bottom: 1px solid transparent;
            transition: 0.5s ease all;

            &:hover {
                border-color: #303030;
            }
        }
    }
}

.error {
    text-align: center;
}
</style>