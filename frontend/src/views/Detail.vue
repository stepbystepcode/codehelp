<template>
    <div class="container">
        <div class="content">
            {{ content }}
            <mavon-editor v-model="postContent" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from '../store/index'
import axios from "axios";
import { useRouter } from 'vue-router';
const router = useRouter();
const content = ref("");
let postContent=ref("");
const id = ref(router.currentRoute.value.fullPath.split('/')[2])
axios.get('http://47.93.214.2:3000/api/detail?id=' + id.value).then(res => content.value=res.data.content)
</script>

<style lang="scss" scoped>

</style>