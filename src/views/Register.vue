<template>
    <div class="form-wrap">

        <form class="register" action="">
            <p class="login-register">
                Have an account?
                <router-link class="router-link" :to="{ name: 'Login' }"> Login </router-link>
            </p>

            <h2>Please enter the following details</h2>

            <div class="inputs">

                <div class="input">
                    <label for="random"> Name: </label>
                    <input type="text" placeholder="Name" v-model="name" />
                </div>

                <br>

                <div class="input">
                    <label for="random"> Email: </label>
                    <input type="text" placeholder="Email" v-model="email" />
                </div>

                <br>

                <div class="input">
                    <label for="random"> Phone Number: </label>
                    <input type="number" min="0" step="1" placeholder="Phone Number"
                        v-model="handphonenumber" />
                </div>

                <br>

                <div class="input">
                    <label for="random"> Password: </label>
                    <input type="text" placeholder="Password" v-model="password" />
                </div>

                <br>

                <div class="input">
                    <label for="random"> Retype Password: </label>
                    <input type="text" placeholder="Reconfirm Password" v-model="reconfirmpassword" />
                </div>

            </div>

            <br>

            <button @click="$event => register()">
                Register
            </button>

            <br>

            <div v-show="error" class="error">{{ this.errorMsg }}</div>
        </form>
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
            name: null,
            email: null,
            handphonenumber: null,
            password: "",
            reconfirmpassword: "",
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
            if (this.password != this.reconfirmpassword) {
                this.error = true;
                this.errorMsg = "Password and Confirmed Password are not the same";
            } else {
                if (this.email != '' && this.handphonenumber != '' && this.password != '') {
                    //     this.error = false;
                    //     const result = fetchSignInMethodsForEmail(auth, email)
                    //     if (result.length === 0) {
                    try {
                        this.error = false;
                        this.errorMsg = "";

                        // alert('In creating stage')
                        const createdUser = await createUserWithEmailAndPassword(auth, this.email, this.password)
                        db.collection('PillPal').doc(user.uid).update(
                        // const docRef = await setDoc(doc(db, "PillPal", this.email), {
                        //     name: this.name,
                        //     email: this.email,
                        //     handphone: this.handphonenumber
                        // })
                        alert('Created')
                        this.$router.push({ name: 'Login' })
                        return
                    } catch (error) {
                        this.error = true;
                        this.errorMsg = "User cannot be Registered"
                    };
                    // } else {
                    // this.error = true;
                    // this.errorMsg = "User has already been Registered";
                    // return;
                    // }
                } else {
                    this.error = true;
                    this.errorMsg = "Please fill out all fields";
                    return;
                }
            }
        }
    },
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