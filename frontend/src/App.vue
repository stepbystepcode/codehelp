<script setup>
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();
const route = useRoute();
onMounted(() => {
  window.addEventListener('unload', saveState())
})

let saveState = ()=>{
  window.sessionStorage.setItem('state',JSON.stringify(store.state))
}
</script>

<template>
  <Header />
  <div class="container">
    <Navbar v-if="!(route.path.toString().includes('/users/login') || route.path.toString().includes('/users/signup'))" />
    <router-view></router-view>
  </div>
</template>

<style scoped>


.container {
  margin: 0 auto;
  width: 100vw;
  margin-top: 50px;
  height: 100%;
  display: flex;
  max-width: 1264px;
}
</style>
