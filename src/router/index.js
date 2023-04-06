import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import ForgotPassword from "../views/ForgotPassword.vue"
import HomePage from "../views/HomePage.vue"
import ReminderConfigPage from "../views/ReminderConfigPage.vue"
import UpdateParticularsPage from '../views/UpdateParticularsPage.vue';
import ScreeningsPage from '../views/ScreeningsPage.vue';
import RewardsPage from '../views/RewardsPage.vue';
import PatientAnalyticsPage from '../views/PatientAnalyticsPage.vue';

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
    {
      path: '/particulars',
      name: 'UpdateParticularsPage',
      component: UpdateParticularsPage,
      meta: {
        title:"Update Particulars Page",
      },
    },
    {
      path: '/screening',
      name: 'ScreeningsPage',
      component: ScreeningsPage,
      meta: {
        title:"Screening Recommendations Page",
      }
    },

    {
      path: '/rewards',
      name: 'RewardsPage',
      component: RewardsPage,
      meta: {
        title:"Reward Points Page",
      }
    },

    {
      path: '/analytics',
      name: 'PatientAnalyticsPage',
      component: PatientAnalyticsPage,
      meta: {
        title:"Patient Analytics Page",
      }
    },
  ]
})

export default router
