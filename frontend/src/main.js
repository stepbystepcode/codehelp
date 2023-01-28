import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import './assets/css/reset.css'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        if (window.localStorage.getItem('key') != null) {
            return { isLogin: true, key: window.localStorage.getItem('key') };
        } else {
            return {
                isLogin: false,
                key: ""
            }
        }
    },
    mutations: {
        login(state) {
            if (state.isLogin) {
                state.key = "";
            }
            state.isLogin = !state.isLogin;
        },
        setKey(state, key) {
            state.key = key;
            state.isLogin = true;
        }
    }
})

createApp(App).use(router).use(store).mount('#app')
