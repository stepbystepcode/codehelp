<script setup lang="ts">
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import auth from './store/auth'
import store from "./store";

const route = useRoute();
onMounted(() => {
  if (!store.state.isAuth && window.localStorage.getItem('key') != null) {
    auth()
  }
})
// onMounted(() => {
//   window.addEventListener('unload', saveState())
// })

// let saveState = ()=>{
//   window.sessionStorage.setItem('state',JSON.stringify(store.state))
// }
</script>

<template>
  <Header />
  <div class="container">
    <Navbar
      v-if="!(route.path.toString().includes('/users/login') || route.path.toString().includes('/users/signup'))" />
    <router-view></router-view>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  margin-top: 50px;
  height: 100%;
  display: flex;
  max-width: 1264px;
}
</style>
