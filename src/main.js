import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import '@/plugins/apexcharts'

// import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
