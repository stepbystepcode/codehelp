<script setup>
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
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
  margin-top: 50px;
  height: 100%;
  display: flex;
}
</style>
