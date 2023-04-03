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
                    <input type="text" placeholder="Input your new Email here" v-model="email" />
                </div>
                <div class="input">
                    <input type="number" min="0" step="1" placeholder="Input your Phone Number here"
                        v-model="handphonenumber" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Input your Password here" v-model="password" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Reconfirm Password here" v-model="reconfirmpassword" />
                </div>
            </div>

            <div v-show="error" class="error">{{ this.errorMsg }}</div>

            <button @click="$event => register()">
                Register
            </button>
        </form>
    </div>
</template>

<script>
import firebaseApp from '@/firebase.js';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from '@firebase/auth';
import { getFirestore, setDoc } from '@firebase/firestore';

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
    name: 'Register',
    data() {
        return {
            email: "",
            handphonenumber: null,
            password: "",
            reconfirmpassword: "",
            error: null,
            errorMsg: null,
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
                            const createdUser = await createUserWithEmailAndPassword(auth, email, password);
                            const created = await createdUser;
                            await setDoc(doc(db, "users", created.user.uid), {
                                Email: this.email,
                                Handphone: this.handphonenumber
                            })
                            this.$router.push({ name: 'Home' })
                            return;
                        } catch (error) {
                            this.error = true;
                            this.errorMsg = "User cannot be Registered"
                        };
                    // } else {
                    //     this.error = true;
                    //     this.errorMsg = "User has already been Registered";
                    //     return;
                    // }
                } else {
                    this.error = true;
                    this.errorMsg = "Please fill out all fields";
                    return;
                }
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

.inputs {
    width: 100%;
    max-width: 350px;
}
</style>
