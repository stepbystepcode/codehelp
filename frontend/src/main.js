import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import './assets/css/reset.css'
import store from '../src/store/index.js'

createApp(App).use(router).use(store).mount('#app')
