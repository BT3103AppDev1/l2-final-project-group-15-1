<template>
    <div class="form-wrap">
        <form class="login">

            <p class="login-register">
                <h3>Don't have an account?</h3><br>
                <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
            </p>

            <h2 id="title"> Login to PillPal </h2>

            <div class="inputs">

                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                </div>

                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                </div>

                

                <div v-show="error" class="error">{{ this.errorMsg }} </div>

            </div>

            <br>

            <button @click.prevent="login" id="login-button"> Login </button>

            <br>

            <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">Forgot your password?</router-link>

            

            <div class="angle"></div>
        </form>

        

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
                    if (current_email.startsWith("admin")) {
                        try {
                            const signedUser = await signInWithEmailAndPassword(auth, current_email, current_pw)
                            const user = signedUser
                            this.$router.push({ name: "AdminPage" });
                            this.error = false;
                            this.errorMsg = "";
                        } catch (err) {
                            this.errorMsg = "Invalid password Entered";
                            this.error = true;
                        }
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
            }
        },
    },
};
</script>
  
<style lang="scss">
* {
    margin:0;
    padding:0;
}

.login-register {
  display: flex;
  
  justify-content: center;
  flex-direction: column;
  border: 2px solid #ccc;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius:10px;
  margin: 2rem;
  background-color:white;
}
.form-wrap {
    background-image: url('../assets/background-registration.jpg');
    background-position:center;
    background-repeat: no-repeat;
    background-size:cover;
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 100%;

    

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

        

        h2 {
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;

            
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
                    // padding: 4px 4px 4px 30px;
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

        .forgot-password:hover{
            font-size:120%;
        }
    }
}

.error {
    text-align: center;
}

.router-link:hover{
    font-size:120%;
    transition: 0.5s ease all;
    
}

#title{
    font-size:40px;
}

#login-button {
 background-color: #eee;
 border: none;
 padding: 1rem;
 font-size: 1rem;
 width: 5em;
 border-radius: 1rem;
 color: green;
 box-shadow: 0 0.4rem #dfd9d9;
 cursor: pointer;
}

#login-button:active {
 color: white;
 box-shadow: 0 0.2rem #dfd9d9;
 transform: translateY(0.2rem);
}

#login-button:hover {
 background: lightgreen;
 color: white;
 text-shadow: 0 0.1rem #bcb4b4;
}

.error{
    font-weight:600;
    color:darkred;
}


</style>