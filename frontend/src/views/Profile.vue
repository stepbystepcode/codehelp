<template>
    <div class="container">
        <div class="content">

            <div class="info">
                <img :src="`https://img1.imgtp.com/${store.state.user.avatar}`" alt="">
                <div class="meta">{{ route.params.username }}</div>
                <div v-if="route.params.username == store.state.user.name"><button
                        @click="store.commit('logout')">退出登录</button><label for="upload">修改头像</label>
                    <input accept="image/*" @change="upload" type="file" name="upload" id="upload">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from '../store/index'
import axios from "axios";
import { routerKey, useRoute } from "vue-router";
const route = useRoute()
let upload = (e) => {
    let file = e.target.files[0]; //获取文件信息
    let formData = new FormData();
    formData.append("image", file);
    axios.post('https://www.imgtp.com/api/upload', formData, {
        headers: {
            'token': '1fee373d94bf7bf2b87fcbf756b716d2',
            'content-type': 'multipart/form-data'
        }
    }).then(res => {
        console.log(res.data.data)
        axios.post('https://www.codehelp.cn:3000/api/avatar', { name: store.state.user.name, data: res.data.data.url.slice(23) }).then(res => console.log(res.data)/*location.reload()*/)
    })
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    img {
        width: 128px;
        border-radius: 5px;
        margin: 16px;
        box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05),
            0 1px 4px hsla(0, 0%, 0%, 0.05),
            0 2px 8px hsla(0, 0%, 0%, 0.05);
    }

    button,
    label {
        border: 1px solid #7aa7c7;
        box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.7);
        padding: 10px;
        font-size: .9em;
        color: #39739d;
        margin: 2.3em 0;
        text-decoration: none;
        border-radius: 3px;

        background: #0a95ff;
        color: #fff;
        margin: 1em;

        &:hover {
            background: #0074cc;
        }
    }

    input {
        display: none;
    }

    .info {
        display: flex;
        flex-wrap: wrap;

        .meta {
            display: flex;
            font-size: 2.61538461rem;
            margin: 16px;
        }
    }

}
</style>
