import './global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupAxiosInterceptors } from './plugins/axiosInterceptor'
import Notifications from '@kyvg/vue3-notification'


import App from './App.vue'
import router from './router'

setupAxiosInterceptors();

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)

app.mount('#app')
