<template>
    <button id="btn" @click="signOut()" v-if="user"> Logout </button>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";

//access user information
import { getAuth } from '@firebase/auth';

export default {
    name: 'Logout',

    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({ name: 'home' })
        }
    }
}
</script>

<style scoped>
#btn {
  text-align: center;
  background-color: red;
  color: white;
  font-size: 18px;
  padding: 12px 24px;
  border-radius: 4px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

#btn:hover {
    transform: scale(1.1);
}
</style>