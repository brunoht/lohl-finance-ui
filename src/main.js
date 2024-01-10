import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import VueCookies from 'vue-cookies'

createApp(App)
    .use(VueCookies, {expires: '1d'})
    .use(router)
    .mount('#app')
