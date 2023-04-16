<template>
    
    <div class="form-wrap">

        <form class="register" ref="registerForm">

            <p class="login-register">
                <h3>Already have an account?</h3> <br>
                <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
            </p>

            <h2 id="title">Register to PillPal</h2>

            <div class="inputs">

                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                </div>

                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                </div>

                <div class="input">
                    <input type="password" placeholder="Reconfirm Password" v-model="reconfirmpassword" />
                </div>

                <div v-show="error" class="error">{{ this.errorMsg }}</div>

            </div>

            <br>

            <button @click.prevent="register" id="submit-button">Submit</button>

            <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"> Forgot your password? </router-link>

            <div class="angle"></div>

        </form>

        <div class="background"></div>

    </div>

</template>

<script>
    import firebaseApp from '@/firebase.js';
    import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
    import { getFirestore, doc, setDoc } from 'firebase/firestore';

    const db = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);

    export default {
        name: 'Register',
        data() {
            return {
                email: '',
                password: '',
                reconfirmpassword: '',
                error: false,
                errorMsg: '',
            };
        },

        // created() {
        //     setTimeout(() => {
        //         this.errorMsg = null;
        //     }, 5000); // clear error message after 5 seconds
        // },

        methods: {
            async clearForm() {
                this.$refs.registerForm.reset();
            },

            async register() {
                const current_email = this.email;
                const current_pw = this.password;
                const current_reconfirm_pw = this.reconfirmpassword;
                if (current_pw !== current_reconfirm_pw) {
                    this.error = true;
                    this.errorMsg = "Password and Confirmed Password are not the same";
                } else {

                    if (current_email.length === 0 || current_pw.length === 0 || current_reconfirm_pw.length === 0) {
                        this.error = true;
                        this.errorMsg = "Please fill out all fields";
                    } else {
                        if (current_pw.length < 6) {

                    

                            this.error = true;
                            this.errorMsg = "Please input at least 6 characters for your password";
                        } else {
                            this.error = false;
                            const numOfSignIn = await fetchSignInMethodsForEmail(auth, current_email)
                            const result = numOfSignIn
                            if (result.length === 0) {
                                this.error = false;
                                this.errorMsg = "";
                                const createdUser = await createUserWithEmailAndPassword(auth, current_email, current_pw)
                                const user = createdUser
                                setDoc(doc(db, "PillPal", current_email), {
                                    email: current_email
                                })
                                setDoc(doc(db, "PillPal", current_email), {
                                Reward_Points: 0
                                })
                                this.error = true;
                                this.errorMsg = "User successfully created";
                                this.clearForm();
                            } else {
                                this.error = true;
                                this.errorMsg = "User has already been Registered";
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

#title{
    font-size:40px;
}


form {
    text-align: center;
    align-items: center;
    margin: auto;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* .form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 100%;
}
*/
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
.router-link:hover{
    font-size:120%;
    transition: 0.5s ease all;
    
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
    flex: 1;
}

h2 {
    text-align: center;
    font-size: 40px;
    color: lightblue;
    margin-bottom: 20px;
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

#submit-button {
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

#submit-button:active {
 color: white;
 box-shadow: 0 0.2rem #dfd9d9;
 transform: translateY(0.2rem);
}

#submit-button:hover {
 background: lightgreen;
 color: white;
 text-shadow: 0 0.1rem #bcb4b4;
}

.error{
    font-weight:600;
    color:darkred;
}
</style>