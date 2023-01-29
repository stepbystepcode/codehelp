import store from "./index";
import axios from "axios"
let auth = () => {
    if (store.state.key != "") {
        axios.get('http://47.93.214.2:3000/api/profile', {
            headers: {
                'Authorization': 'Bearer ' + store.state.key
            }
        }).then(res => {
            console.log(res);
            if ("username" in res.data) {
                store.commit('login', res.data.username);
                // router.push('/')
            }else{
                store.commit('logout')
            }
        })
    }
}
export default auth;