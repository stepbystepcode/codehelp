<template>
    <div class="container">
        <div class="content">
            <div class="title-bar">
                <span>{{ store.state.info.title }}</span>
                <AskBtn />
            </div>
            <div class="info">{{ store.state.info.views }}次浏览</div>
            <template v-for="(item, index) in content" :key="item">
                <div class="post-warp">
                    <div class="vote-cell">

                        <input type="radio" :name="item._id" :id="`${item._id}_a`">
                        <label :for="`${item._id}_a`" @click="like(item._id, index, 1)">
                            <img :style="filterStyle(index, 1)" src="../assets/img/vote.svg" alt="like" /></label>
                        {{
                            item.likes.length - item.dislikes.length
                        }}
                        <input type="radio" :name="item._id" :id="`${item._id}_b`">
                        <label :for="`${item._id}_b`" @click="like(item._id, index, 0)">
                            <img :style="filterStyle(index, 0)" src="../assets/img/vote.svg" alt="dislike" /></label>

                    </div>
                    <div class="content-cell">
                        <Markdown :markdown="item.content"></Markdown>
                    </div>
                </div>
                <div v-if="index == 0" style="font-size: 1.2rem; font-weight: 700">
                    共 {{ content.length - 1 }} 个回答
                </div>
            </template>
            <div style="padding:1em">你的回答</div>
            <Editor v-model="postContent" @imgAdd="imgAdd" />
            <button @click="check()">提交</button>
        </div>
    </div>
</template>

<script setup>
import Editor from "../components/Editor.vue";
import "../assets/css/reset.scss";
import { ref, onMounted } from "vue";
import AskBtn from "../components/AskBtn.vue";
import Markdown from "../components/Markdown.vue";
import store from "../store/index";
import axios from "axios";
import { useRouter } from "vue-router";
import swal from "sweetalert";

const imgnum = ref(0);
const imgAdd = (pos, file) => {
    console.log(file);
    const formData = new FormData()
    formData.append("fileName", id.value + "_" + content.value.length + "_" + imgnum.value + '.' + file.name.split('.').pop());
    formData.append('image', file)

    // 使用 axios 等工具发送图片到服务端
    axios.post('http://47.93.214.2:3000/api/upload2', formData).then(({ data }) => {
        const url = data.url
        postContent.value = postContent.value.replace(/!\[[^\]]+\]\([^)]+\)/, `![](${url})`);
        imgnum.value++;
    })
}
const filterStyle = (index, which) => {
    let filter;
    if (which == 1) {
        filter =
            content.value[index].likes.indexOf(store.state.user.name) !== -1
                ? "filter: invert(.5) sepia(1) saturate(5) hue-rotate(175deg)"
                : "filter: unset";
    } else {
        filter =
            content.value[index].dislikes.indexOf(store.state.user.name) !== -1
                ? "filter: invert(.5) sepia(1) saturate(5) hue-rotate(175deg)"
                : "filter: unset";
    }
    return filter;
};
const like = (content_id, index, lod) => {
    if (!store.state.isAuth) swal("请先登录", "", "info");
    else {
        axios
            .get(
                `http://47.93.214.2:3000/api/like?id=${content_id}&user=${store.state.user.name}&lod=${lod}`
            )
            .then((res) => {
                function transferElement(arr1, arr2, name) {
                    const index1 = arr1.indexOf(name);
                    const index2 = arr2.indexOf(name);
                    if (index1 !== -1) {
                        arr1.splice(index1, 1);
                        arr2.push(name);
                    } else if (index2 !== -1) {
                        arr2.splice(index2, 1);
                        arr1.push(name);
                    }
                }
                if (res.data.info == "like") {
                    console.log(content.value[index]);
                    transferElement(
                        content.value[index].dislikes,
                        content.value[index].likes,
                        store.state.user.name
                    );
                } else if (res.data.info == "dislike") {
                    transferElement(
                        content.value[index].likes,
                        content.value[index].dislikes,
                        store.state.user.name
                    );
                } else {
                    swal(res.data.info, "", "info");
                }
            });
    }
};
const router = useRouter();
const content = ref([]);
let postContent = ref("");
const id = ref(router.currentRoute.value.fullPath.split("/")[2]);
axios.get("http://47.93.214.2:3000/api/detail?id=" + id.value).then((res) => {
    content.value = res.data;
});
const check = () => {
    if (!store.state.isAuth) swal("请先登录").then(router.push("/users/login"));
    else if (postContent.value == "") swal("请输入内容");
    else answer();
};
const answer = () => {
    const json = JSON.stringify({
        question_id: id.value,
        content: postContent.value,
        user: store.state.user,
        time: new Date().getTime(),
        votes: 0,
    });
    axios.post("http://47.93.214.2:3000/api/answer", json, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    swal("回答成功", "", "success")//.then(window.location.reload());
};
axios
    .get("http://47.93.214.2:3000/api/info?id=" + id.value)
    .then((res) => store.commit("setInfo", res.data));
</script>

<style lang="scss" scoped>
code {
    font-family: monospace !important;
}

.container {
    .content {
        padding: 24px;
        line-height: 2;
        width: 100%;

        .title-bar {
            display: flex;
            justify-content: space-between;

            span {
                font-size: 27px;
            }
        }

        .post-warp {
            display: flex;
            padding: 16px 0;
            border-bottom: 1px solid rgb(227, 230, 242);

            .vote-cell {
                display: flex;
                flex-direction: column;
                padding-right: 16px;
                align-items: center;

                :nth-child(4) {
                    transform: rotate(180deg);
                }

                input {
                    display: none;
                }

                label {
                    width: 36px;
                    height: 36px;
                }
            }

            .content-cell {
                display: flex;
                flex: 1;
                flex-direction: column;
                width: 100%;
            }
        }
    }
}
</style>
