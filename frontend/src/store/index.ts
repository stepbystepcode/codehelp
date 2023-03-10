import { createStore } from "vuex";

const state =
  window.localStorage.getItem("key") != null
    ? {
        key: window.localStorage.getItem("key"),
        user: {},
        info: {},
        showbar: true,
      }
    : {
        isAuth: false,
        key: "",
        user: {},
        info: {},
        showbar: true,
      };

const mutations = {
  login(state, user) {
    state.user.name = user.username;
    state.user.avatar = user.avatar;
    state.isAuth = true;
  },
  logout(state) {
    state.key = "";
    window.localStorage.removeItem("key");
    state.user = {};
    state.isAuth = false;
    window.location.href = "/";
  },
  setKey(state, key) {
    state.key = key;
    state.isAuth = true;
  },
  setInfo(state, info) {
    state.info = info;
  },
  togglebar(state) {
    state.showbar = !state.showbar;
  },
};

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
};

const getters = {
  // evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
};

export default createStore({
  state,
  getters,
  actions,
  mutations,
});
