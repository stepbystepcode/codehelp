<template>
    <div class="container">
        <div class="content">
            <div class="box">
                <span>标题</span>
                <input type="text" class="input" v-model="title">
            </div>
            <div class="box">
                <span>你的问题是什么？</span>
                <span>请详细描述你的问题，至少20字。</span>
                <Editor v-model="content" />
                <br>
                <span>空格键添加标签</span>
                <div class="input fake">
                    <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
                    <input type="text" v-model="tag" @keydown.space.prevent="handleKeydown()" @keydown.delete="del()">
                </div>
                <button @click="check()">提交</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Editor from '../components/Editor.vue'
import { ref } from "vue";
import axios from 'axios';
import swal from 'sweetalert'
import store from "../store";
let title = ref("");
let content = ref("");
const tags = ref([]);
const tag = ref("");
const del = () => {
    if (tag.value == '') tags.value.pop()
}
const handleKeydown = () => {
    if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, "");
        tags.value.push(tag.value)
    }
    tag.value = "";
}
const check = () => {
    if (content.value == "") swal("请输入内容")
    else submint()
}
let submint = () => {
    if (content.value != "" && title.value != "") {
        const json = JSON.stringify({
            content: content.value,
            title: title.value,
            tags: Array.from(tags.value),
            user: store.state.user,
            views: 0,
            answers: 0,
            modified: 0,
            time: new Date().getTime(),
            votes: 0
        });
        axios.post('http://47.93.214.2:3000/api/ask', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        swal('提问成功', '', 'success').then(window.location.reload())
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 24px;

    .box {
        padding: 24px;
        border: 1px solid #e3e6e8;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        margin-top: 12px;

        span {
            padding-bottom: 1em;
        }

        .input {
            flex: 1;
            outline: rgb(107, 137, 147);
            border: 1px solid #babfc4;
            border-radius: 3px;
            display: flex;

            &:focus {
                border: 1px solid #6bbbf7;
                box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
            }

            input {
                border: none;
                outline: none;
                flex: 1;
                padding: .6em .7em;
            }
        }

        input {
            padding: .6em .7em;
        }

        //        .fake {
        //           padding: 1px;
        //      }
    }

    button {

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
        width: 60px;

        &:hover {
            background: #0074cc;
        }
    }
}

.pill {
    display: inline-block;
    margin: 2px;
    background: #e1ecf4;
    padding: 8px;
    color: #39739d;
    border-radius: 3px;
    font-size: 12px;
}
</style>