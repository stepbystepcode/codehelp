<template>
    <div class="container">
        <div class="content">
            <input type="text" v-model="title">
            <mavon-editor v-model="content" />
            <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown()">
            <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
            <button @click="submint()">提交</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import store from "../store";
let title = ref("");
let content = ref("");
const tags = ref([]);
const tag = ref("");
const handleKeydown = () => {
    if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, "");
        tags.value.push(tag.value)
    }
    tag.value = "";
}
let submint = () => {
    if (content.value != "" && title.value != "") {
        const json = JSON.stringify({
            content: content.value,
            title: title.value,
            tags: Array.from(tags.value),
            user: store.state.user,
            views:0,
            answers:0,
            modified:0,
            time: new Date().getTime(),
            votes:0
        });
        axios.post('http://47.93.214.2:3000/api/ask', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
}
</style>