<template>
    <div class="container">
        <div class="content">
            {{ store.state.user.name }}
            <button @click="store.commit('logout')">退出登录</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from '../store/index'
import isAuth from "../store/auth";
if (!isAuth)
    window.location.href = "/users/login"

</script>

<style lang="scss" scoped>

</style>