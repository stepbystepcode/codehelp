<template>
    <div class="container">
        <div class="content">
            问题：<input type="text">
            
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useStore } from "vuex";
const store = useStore();
// let email = ref("");
if (store.state.key != "") {
    axios.get('http://47.93.214.2:3000/api/profile', {
        headers: {
            'Authorization': 'Bearer ' + store.state.key
        }
    }).then(res => { console.log(res); if (res.data.username) { store.commit('login', res.data.username); } })

} else {
    window.location = "/users/login"
}
</script>

<style lang="scss" scoped>

</style>