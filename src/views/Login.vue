 <template>
    <div class="form-wrap">
        <form class='login' action="">
            <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{name:'Register'}">Register</router-link>
            </p>
            <h2>Login</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder = "Email" v-model="email"/>
                </div>
                <div class="input">
                    <input type="text" placeholder = "Password" v-model="password"/>
                </div>
            </div>
            <router-link class="forgot-password" :to="{name:'ForgotPassword'}">Forgot Password?</router-link>   
            <button>Sign In</button> 
        </form>
    </div>
 </template>
 
 <script>
 export default {
    name: "Login",
    data() {
        return {
            email:null,
            password:null,
        }
    }
 }
 </script>
 
 <style scoped>
 .form-wrap {
    overflow:hidden;
    display:flex;
    height:100vh;
    justify-content:center;
    align-self:center;
    margin: 0 auto;
    width:90%;

    
 }

 .login-register {
    margin-bottom:32px;
    color:black;
 }

 .router-link {
    color: green;
 }

 form {
    padding:0 5px;
    position: relative;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    flex:1
 }

 h2{
    text-align:center;
    font-size:32px;
    color: lightblue;
    margin-bottom:40px;
 }

 .forgot-password{
    text-decoration:none;
    color:green;
    cursor:pointer;
    font-size:14px;
    margin: 32px 0;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;
 }

 :hover {
    border-color:grey;
 }

 .inputs{
    width:100%;
    max-width:350px;
}
 
 </style>            