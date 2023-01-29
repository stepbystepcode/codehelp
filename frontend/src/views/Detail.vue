<template>
    <div class="container">
        <div class="content">
            <div v-for="item in content" :key="item">{{ item.content }}</div>

            <mavon-editor v-model="postContent" />
            <button @click="answer()">提交</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from '../store/index'
import axios from "axios";
import { useRouter } from 'vue-router';
const router = useRouter();
const content = ref([]);
let postContent = ref("");
const id = ref(router.currentRoute.value.fullPath.split('/')[2])
axios.get('http://47.93.214.2:3000/api/detail?id=' + id.value).then(res => content.value = res.data)
const answer = () => {
    if (postContent.value != "") {
        const json = JSON.stringify({
            question_id: id.value,
            content: postContent.value,
            user: store.state.user,
            time: new Date().getTime(),
            votes: 0
        });
        axios.post('http://47.93.214.2:3000/api/answer', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
</script>

<style lang="scss" scoped>

</style>