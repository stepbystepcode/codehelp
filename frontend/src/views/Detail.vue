<template>
    <div class="container">
        <div class="content">
            <div class="title-bar">
                <AskBtn />
                <span>{{ store.state.info.title }}</span>
            </div>
            <div class="info">{{ store.state.info.views }}次浏览</div>
            <template v-for="(item, index) in content" :key="item">
                <div class="post-warp">
                    <div class="vote-cell">

                        <input type="radio" :name="item._id" :id="`${item._id}_a`">
                        <label :for="`${item._id}_a`" @click="like(item._id, index, 1)">
                            <img :style="filterStyle(index, 1)" src="https://img1.imgtp.com/2023/02/24/OD5pahfR.svg" alt="like" /></label>
                        {{
                            item.likes.length - item.dislikes.length
                        }}
                        <input type="radio" :name="item._id" :id="`${item._id}_b`">
                        <label :for="`${item._id}_b`" @click="like(item._id, index, 0)">
                            <img :style="filterStyle(index, 0)" src="https://img1.imgtp.com/2023/02/24/OD5pahfR.svg" alt="dislike" /></label>

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
//import Editor from "../components/Editor.vue";
import "../assets/css/reset.scss";
import { ref, defineAsyncComponent } from "vue";
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
formData.append("image", file);
    axios.post('https://www.imgtp.com/api/upload', formData, {
        headers: {
            'token': '1fee373d94bf7bf2b87fcbf756b716d2',
            'content-type': 'multipart/form-data'
        }
    }).then(({ data }) => {
        const url = data.data.url
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
                `https://www.codehelp.cn:3000/api/like?id=${content_id}&user=${store.state.user.name}&lod=${lod}`
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
const getData = async () => {
    const a = axios.get(`https://www.codehelp.cn:3000/api/detail?id=${id.value}`)//.then((res) => {
    //content.value = res.data;
    //});
    const b = axios
        .get("https://www.codehelp.cn:3000/api/info?id=" + id.value)
    //.then((res) => store.commit("setInfo", res.data));
    return Promise.all([a, b]);
}
getData().then(res => { content.value = res[0].data; store.commit("setInfo", res[1].data) })
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
    axios.post("https://www.codehelp.cn:3000/api/answer", json, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    swal("回答成功", "", "success")//.then(window.location.reload());
};
//const Markdown = defineAsyncComponent(() => import("../components/Markdown.vue"))
const Editor = defineAsyncComponent(() => import("../components/Editor.vue"))
</script>

<style lang="scss" scoped>
code {
    font-family: monospace !important;
}

.container {
    .content {
        padding: 24px;
        line-height: 2;
	width: 100vw;
	box-sizing: border-box;

        .title-bar {
	    flex-direction: row-reverse;
	    flex-wrap: wrap;
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
    flex-grow: 1;
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
                flex-direction: column;
    flex-grow: 0;
overflow:hidden;
                width: 100%;
            }
        }
    }
}
</style>
