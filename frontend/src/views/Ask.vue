<template>
    <div class="container">
        <div class="content">
            <input type="text" v-model="title">
            <mavon-editor v-model="content" />
            <button @click="submint()">提交</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
let title = ref("");
let content = ref("");
let submint = () => {
    if (content.value != "" && title.value != "") {
        const json = {
            content: content.value,
            title: title.value
        };
        axios.post('http://47.93.214.2:3000/api/ask', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
</script>

<style lang="scss" scoped>

</style>