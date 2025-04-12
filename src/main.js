import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia()) // ✅ 註冊 Pinia
import { i18n } from './i18n'
app.use(i18n)
app.use(router)
app.mount('#app')