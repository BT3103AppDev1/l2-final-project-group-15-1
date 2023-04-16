<template>
    <div class="reset-password">
        <!-- <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal" /> -->
        <div class="form-wrap">

            <form class="reset">

                <p class="login-register">
                    <h3>Already have an account?</h3><br>
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </p>

                <h2 id="title">Reset Password</h2>
                
                <p id="reset-text">Enter your email to reset your password.</p>

                <div class="inputs">

                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                    </div>

                </div>


                <div v-show="error" class="error">{{ this.errorMsg }}</div>

                <br>

                <button @click.prevent="resetPassword" id="reset-button"> Reset </button>

            </form>

        </div>

    </div>

</template>
  
<script>
// import Modal from "../components/Modal.vue";
import { sendPasswordResetEmail, getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import firebaseApp from '@/firebase.js';
import { toHandlers } from "vue";

const auth = getAuth(firebaseApp);

export default {
    name: "ForgotPassword",
    data() {
        return {
            email: '',
            error: false,
            errorMsg: '',
            // modalActive: false,
            // modalMessage: '',
        };
    },

    // components: {
    //     Modal,
    // },

    methods: {
        async resetPassword() {
            const current_email = this.email;
            if (current_email.length === 0) {
                this.errorMsg = "Please input email";
                this.error = true;
                // this.modalActive = true;
                // this.modalMessage = "Please input Email";
            } else {
                try {
                    const result = await fetchSignInMethodsForEmail(auth, current_email)
                    if (result.length === 0) {
                        this.errorMsg = "Email not registered"
                        this.error = true;
                        // this.modalMessage = "Email not Registered"
                        // this.modalActive = true;
                    } else {
                        try {
                            await sendPasswordResetEmail(auth, current_email)
                            this.errorMsg = "Recovery link sent to your email";
                            this.error = true;
                            // this.modalMessage = "Recovery link sent to your email";
                            // this.modalActive = true;
                        } catch (err) {
                            this.errorMsg = "Email does not exist";
                            this.error = true;
                            // this.modalMessage = "Email does not exist";
                            // this.modalActive = true;
                        }
                    }
                } catch (err) {
                    this.errorMsg = "Invalid Email entered"
                    this.error = true;
                }
            }
        }
    },

    // closeModal() {
    //     this.modalActive = !this.modalActive;
    //     this.email = "";
    // },
}
</script>
  
<style lang="scss" scoped>

.error{
    font-weight:600;
    color:darkred;
}
#reset-text{
    color:black;
    font-size:18px;
    font-weight:600;
}
#title{
    font-size:40px;
    font-weight:bolder;
}
.input {
    display: inline-block;
    text-align: center;
    width: 100%;
    max-width: 350px;
}

form {
    text-align: center;
    align-items: center;
    margin: auto;
}

.reset-password {
    position: relative;

    .form-wrap {
        .reset {
            h2 {
                margin-bottom: 8px;
            }

            p {
                text-align: center;
                margin-bottom: 32px;
            }
        }
    }
}

#reset-button {
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

#reset-button:active {
 color: white;
 box-shadow: 0 0.2rem #dfd9d9;
 transform: translateY(0.2rem);
}

#reset-button:hover {
 background: lightgreen;
 color: white;
 text-shadow: 0 0.1rem #bcb4b4;
}

</style>
  