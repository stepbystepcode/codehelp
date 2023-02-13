import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import './assets/css/reset.css'
import store from './store/index.js'
//const mavonEditor = () => import('mavon-editor');
import 'mavon-editor/dist/css/index.css'

createApp(App).use(router).use(store).mount('#app')
