import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import "normalize.css"
import "./assets/css/index.css"

createApp(App).use(pinia).use(router).mount('#app')
