import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import './assets/css/reset.css'
import store from '../src/store/index.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

createApp(App).use(router).use(mavonEditor).use(store).mount('#app')
