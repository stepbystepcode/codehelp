import axios from 'axios';
// import { useStore } from "vuex";
// const store = useStore();
import store from './index.js'
// let email = ref("");
const isAuth = () => {
    if (store.state.key != "") {
        axios.get('http://47.93.214.2:3000/api/profile', {
            headers: {
                'Authorization': 'Bearer ' + store.state.key
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.username) {
                store.commit('login', res.data);
                return true
            } else { store.commit('logout'); return false}
        })

    } else return false
}
isAuth()
export default isAuth