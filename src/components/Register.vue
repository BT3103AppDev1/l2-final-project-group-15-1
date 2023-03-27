<template>
    <div class="form-wrap">
        <form class="register" action="">
            <p class="login-register">
                Have an account?
                <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
            </p>
            <h2>Please enter the following details</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                </div>
                <div class="input">
                    <input type="text" placeholder="HandphoneNumber" v-model="handphonenumber" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Password" v-model="password" />
                </div>
            </div>
            <div v-show="error" class="error">{{ this.errorMsg }}</div>

            <button @click="register(email, handphonenumber, password)">
                Register
            </button>
        </form>
    </div>
</template>

<script>
import firebaseApp from '@/firebase.js';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

const db = getFirestore(firebaseApp);

export default {
    name: 'Register',
    data() {
        return {
            email: null,
            handphonenumber: null,
            password: null,
            error: null,
            errorMsg: '',
        };
    },

    methods: {
        async register(email, handphonenumber, password) {
            if (this.email != '' && this.handphonenumber != '' && this.password != '') {
                this.error = false
                const auth = getAuth();
                fetchSignInMethodsForEmail(auth, email)
                    .then((result) => {
                        if (result.length === 0) {
                            createUserWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    const user = userCredential.user;
                                    const database = db.collection("users").doc(user.uid);
                                    database.set({ handphonenumber: handphonenumber, email: email });
                                    this.$router.push({ name: 'Home' })
                                    return;
                                })
                                .catch((error) => {
                                    this.error = true;
                                    this.errorMsg = "User cannot be Registered"
                                });
                        } else {
                            this.error = true;
                            this.errorMsg = "User Registered";
                            return;
                        }
                    })
                } else { 
                this.error = true;
                this.errorMsg = 'Please fill out all fields;'
                return;
            }
        }
    }
}
</script>

<style scoped>
/* .register {
    h2 {
        max-width: 350px;
    }
} */

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

.inputs {
    width: 100%;
    max-width: 350px;
}
</style>
