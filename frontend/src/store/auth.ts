import store from "./index";
import axios from "axios"
let auth = () => {
    if (store.state.key != "") {
        axios.get('https://www.codehelp.cn:3000/api/auth', {
            headers: {
                'Authorization': 'Bearer ' + store.state.key
            }
        }).then(res => {
            console.log(res);
            if ("username" in res.data) {
                store.commit('login', res.data);
                // router.push('/')
            }else{
                store.commit('logout')
            }
        })
    }
}
export default auth;
