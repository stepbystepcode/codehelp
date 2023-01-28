import { createStore } from 'vuex'

const state =
    window.localStorage.getItem('key') != null ? {
        isLogin: true, key: window.localStorage.getItem('key'), user: {}
    } : {
        isLogin: false,
        key: "",
        user: {}
    }


const mutations = {
    login(state, user) {
        state.user.name = user.username;
        state.isLogin = true
    },
    logout(state) {
        state.key = "";
        window.localStorage.removeItem('key')
        state.user = {}
        state.isLogin = false
        window.location.href = '/'
    },
    setKey(state, key) {
        state.key = key;
        state.isLogin = true;
    }
}

const actions = {
    // increment: ({ commit }) => commit('increment'),
    // decrement: ({ commit }) => commit('decrement'),
    // incrementIfOdd({ commit, state }) {
    //     if ((state.count + 1) % 2 === 0) {
    //         commit('increment')
    //     }
    // },
    // incrementAsync({ commit }) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             commit('increment')
    //             resolve()
    //         }, 1000)
    //     })
    // }
}

const getters = {
    // evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

export default createStore({
    state,
    getters,
    actions,
    mutations
})