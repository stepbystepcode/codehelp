<template>
    <div class="container">
        <div class="content">
            <div class="title-bar">
                <span>{{ content[0].title }}</span>
                <AskBtn />
            </div>
            <div class="info">
                {{ content[0].views }}次浏览
            </div>
            <div class="post-warp" v-for="(item, index) in content" :key="item">
                <div v-if="index == 1">{{ content.length - 1 }}个回答</div>
                <div class="vote-cell"><img src="../assets/img/vote.svg" alt="">{{ item.votes }}<img
                        src="../assets/img/vote.svg" alt=""></div>
                <div class="content-cell"><Markdown :markdown="item.content"></Markdown>
                </div>
            </div>


            <!-- <mavon-editor v-model="postContent" /> -->
            <button @click="check()">提交</button>
        </div>
    </div>
</template>

<script setup>
import '../assets/css/reset.scss'
import { ref,onMounted } from "vue";
import AskBtn from "../components/AskBtn.vue";
import Markdown from '../components/Markdown.vue'
import store from '../store/index'
import axios from "axios";
import { useRouter } from 'vue-router';
import swal from 'sweetalert'

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
    swal('回答成功').then(res => { window.location.reload() })
}

</script>

<style lang="scss" scoped>
code{
    font-family:monospace!important;
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