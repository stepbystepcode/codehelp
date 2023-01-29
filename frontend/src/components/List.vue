<template>
  <div class="list-warp">
    <div v-for="item in data" :key="item" class="item">
      <div class="info">
        <span>{{ item.votes }} 热度</span>
        <span>{{ item.answers }} 回答</span>
        <span>{{ item.views }} 浏览</span>
      </div>
      <div class="content">
        <span class="title" @click="router.push('/questions/' + item._id + '/' + pinyin.getFullChars(item.title))">{{ item.title }}</span>
        <div class="meta">
          <div><span class="tag" v-for="tag in item.tags">{{ tag }} </span></div>
          <div class="meta-minimal"><img :src="item.avatar" alt="avatar"><span>{{ item.userName }} {{ item.modified }} 修改</span>{{ item.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import pinyin from 'js-pinyin'
import { useRouter } from 'vue-router';
import {ref, reactive} from "vue";
const router = useRouter();
let data = ref([]);
axios("http://47.93.214.2:3000/api/questions").then(res => {
  data.value = res.data;
  console.log(res.data);
});
</script>

<style lang="scss" scoped>

.list-warp {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 100vw;

  .item {
    display: flex;
    border-bottom: 1px solid #e3e6e8;
    padding: 16px;

    .info {
      color:#6a737c;
      width: 108px;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      margin-right: 16px;

      span {
        padding: .4em;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .title {
        color: #0074cc;
        margin-bottom: .3rem;
        &:hover{
          color:#0a95ff;
          cursor: pointer;
        }
      }

      .meta {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        div{
          .tag {
            padding: .4em;
            margin: .3em;
            background: #e1ecf4;
            color: #39739d;
            font-size: .8em;
          }
        }
        .meta-minimal{
          display: flex;
          align-items: center;
          img{
            width: 18px;
            height: 18px;
          }

        }
      }
    }
  }
}
</style>