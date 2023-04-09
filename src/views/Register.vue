<template>
    <div class="form-wrap">

        <form class="register">

            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
            </p>

            <h2>Register to PillPal</h2>

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

            <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">Forgot your password?</router-link>

            <button @click.prevent="register">Submit</button>

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
            error: null,
            errorMsg: "",
        };
    },

    // created() {
    //     setTimeout(() => {
    //         this.errorMsg = null;
    //     }, 5000); // clear error message after 5 seconds
    // },

    methods: {
        async register() {
            if (this.password !== this.reconfirmpassword) {
                this.error = true;
                this.errorMsg = "Password and Confirmed Password are not the same";
                // alert("Password and Retyped password are not the same")
            } else {
                if (this.email !== '' && this.password !== '') {
                    this.error = false;
                    const numOfSignIn = await fetchSignInMethodsForEmail(auth, this.email)
                    const result = numOfSignIn
                    if (result.length === 0) {
                        this.error = false;
                        this.errorMsg = "";
                        const createdUser = await createUserWithEmailAndPassword(auth, this.email, this.password)
                        const user = createdUser
                        setDoc(doc(db, "PillPal", this.email), {
                            email: this.email
                        })
                        setDoc(doc(db, "PillPal", this.email), {
                            Reward_Points: 0
                        })
                        // alert('User Created')
                        this.error = true;
                        this.errorMsg = "User successfully created"
                    } else {
                        this.error = true;
                        this.errorMsg = "User has already been Registered";
                        return;
                    }
                } else {
                    this.error = true;
                    this.errorMsg = "Please fill out all fields";
                    // alert("Please fill out all fields")
                    return;
                }
            }
        }
    }
}
</script>

<style scoped>
.inputs {
    display: inline-block;
    text-align: right;
    width: 100%;
    max-width: 350px;
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
    flex: 1;
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
</style>