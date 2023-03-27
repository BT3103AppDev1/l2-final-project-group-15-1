import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import ForgotPassword from "../views/ForgotPassword.vue"
import HomePage from "../views/HomePage.vue"
import ReminderConfigPage from "../views/ReminderConfigPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title:"Login",
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title:"Register",
      },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title:"Forgot Password",
      },
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title:"Home Page",
      },
    },
    {
      path: '/overview',
      name: 'ReminderConfigPage',
      component: ReminderConfigPage,
      meta: {
        title:"Reminder Configuration Page",
      },
    },
  ]
})

export default router
