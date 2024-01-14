import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import VueCookies from 'vue-cookies'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(VueCookies, {expires: '1d'})
app.use(pinia)
app.use(router)
app.mount('#app')
