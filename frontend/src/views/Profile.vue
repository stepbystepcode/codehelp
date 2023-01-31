<template>
    <div class="container">
        <div class="content">
            {{ store.state.user.name }}
            <button @click="store.commit('logout')">退出登录</button>
            <img :src="store.state.user.avatar" alt="">
            <label for="upload">修改头像</label>
            <input accept="image/*" @change="upload" type="file" name="upload" id="upload">
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from '../store/index'
import axios from "axios";
let upload = (e) => {
    let file = e.target.files[0]; //获取文件信息
    let formData = new FormData();
    formData.append("avatar", file);
    formData.append("fileName", store.state.user.name +'.'+ e.target.files[0].name.split('.').pop());
    axios.post("http://47.93.214.2:3000/api/upload", formData).then(res => { console.log(res) })
}
</script>

<style lang="scss" scoped>
.content {
    img {
        width: 3em;
    }

    label {
        display: block;
        padding: 1em;
        background: blue;
    }

    input {
        display: none;
    }
}
</style>