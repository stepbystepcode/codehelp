<template>
    <div class="container">
        <div class="content">
            <div class="title-bar">
                <span>{{ store.state.info.title }}</span>
                <AskBtn />
            </div>
            <div class="info">
                {{ store.state.info.views }}次浏览
            </div>
            <div class="post-warp" v-for="(item, index) in content" :key="item">
                <div v-if="index == 1">{{ content.length - 1 }}个回答</div>
                <div class="vote-cell"><img @click="like(item._id, index)"
                        :style="`filter:${(item.likes.indexOf(store.state.user.name) == -1) ? '' : 'invert(.5) sepia(1) saturate(5) hue-rotate(175deg)'}`"
                        src="../assets/img/vote.svg" alt="">{{
                            item.likes.length
                        }}<img src="../assets/img/vote.svg" alt=""></div>
                <div class="content-cell">
                    <Markdown :markdown="item.content"></Markdown>
                </div>
            </div>


            <Editor v-model="postContent" />
            <button @click="check()">提交</button>
        </div>
    </div>
</template>

<script setup>
import Editor from '../components/Editor.vue'
import '../assets/css/reset.scss'
import { ref, reactive } from "vue";
import AskBtn from "../components/AskBtn.vue";
import Markdown from '../components/Markdown.vue'
import store from '../store/index'
import axios from "axios";
import { useRouter } from 'vue-router';
import swal from 'sweetalert'

const like = (content_id, index) => {
    if (!store.state.isAuth) swal("请先登录", "", "info");
    else {
        axios
            .get(
                `http://47.93.214.2:3000/api/like?id=${content_id}&user=${store.state.user.name}`
            )
            .then((res) => {
                if (res.data == "您已经赞过了") {
                    swal(res.data, "", "info");
                } else {
                    // document.querySelectorAll(".vote-cell")[index].children[0].style.filter =
                    //     "invert(.5) sepia(1) saturate(5) hue-rotate(175deg)";
                    content.value[index].likes.push(1)
                }
            });

    }
};
const router = useRouter();
const content = ref([]);
let postContent = ref("");
const id = ref(router.currentRoute.value.fullPath.split('/')[2])
axios.get('http://47.93.214.2:3000/api/detail?id=' + id.value).then(res => content.value = res.data)
const check = () => {
    if (!store.state.isAuth) swal("请先登录").then(router.push('/users/login'))
    else if (postContent.value == "") swal("请输入内容")
    else answer()
}
const answer = () => {

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
    swal('回答成功', '', 'success').then(window.location.reload())
}
axios.get('http://47.93.214.2:3000/api/info?id=' + id.value).then(res => store.commit('setInfo', res.data))
</script>

<style lang="scss" scoped>
code {
    font-family: monospace !important;
}

.container {
    .content {
        padding: 24px;

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

                :nth-child(2) {
                    transform: rotate(180deg);
                }
            }

            .content-cell {
                display: flex;
                flex: 1;
                flex-direction: column;
            }
        }
    }
}
</style>