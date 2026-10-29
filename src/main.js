import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'   // prendiamo il router

createApp(App).use(router).mount('#app')   // .use(router) = "accendi il router"
