import './global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupAxiosInterceptors } from './plugins/axiosInterceptor'

import App from './App.vue'
import router from './router'

setupAxiosInterceptors();

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
