<template>
  <div class="list-warp">
    <div class="title-bar">
      <span>{{ pageTitle }}</span>
      <AskBtn />
    </div>
    <div v-for="item in data" :key="item" class="item">
      <div class="info">
        <span>{{ item.votes }} 热度</span>
        <span>{{ item.answers }} 回答</span>
        <span>{{ item.views }} 浏览</span>
      </div>
      <div class="content">
        <span class="title"
          @click="router.push({ path: '/questions/' + item._id + '/' + pinyin.getFullChars(item.title) })">{{
            item.title
          }}</span>
        <div class="meta">
          <div><span class="tag" v-for="tag in item.tags">{{ tag }} </span></div>
          <div class="meta-minimal"><img :src="`http://47.93.214.2:3000/avatar/${item.user.name}.jpg`"
              alt="avatar"><span>{{ item.user.name }} {{
                item.modified
              }}
              修改</span>&nbsp;{{ time(item.time) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AskBtn from './AskBtn.vue';
import axios from 'axios';
import pinyin from 'js-pinyin'
import store from '../store/index'
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from "vue";
const router = useRouter();
const route = useRoute();
console.log("params.tag:");
console.log(route.params.tag);
const withTag = computed(() => {
  return data.value.filter((p) => p.tags.includes(route.params.tag))
})
const withSearch = computed(() => {
  return data.value.filter((p) => p.title.includes(route.query.q))
})
let data = ref([]);
const time = (after_time) => {
  const now_time = new Date().getTime()
  const hm = parseInt((now_time - after_time) / 1000)//毫秒
  const day = parseInt(hm / 60 / 60 / 24);
  const hour = parseInt(hm / 60 / 60 % 24);
  const min = parseInt(hm / 60 % 60);
  const m = parseInt(hm % 60);
  if (day > 0) return day + "天前"; else if (hour > 0) return hour + "小时前"; else if (min > 0) return min + "分钟前"; else return m + "秒前";
};


const pageTitle = ref('')
axios("http://47.93.214.2:3000/api/questions").then(res => {
  data.value = res.data.reverse();
  if (window.location.href.includes('tagged')) {
    data.value = withTag.value
    pageTitle.value = route.params.tag
  }
  if (window.location.href.includes('search')) {
    data.value = withSearch.value
    pageTitle.value = '搜索结果'
  }
  if (window.location.pathname === '/') {
    pageTitle.value = '热门问题'
  }
  if (window.location.pathname === '/questions') {
    pageTitle.value = '全部问题'
  }
  console.log(res.data);
});
</script>

<style lang="scss" scoped>
.list-warp {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 100vw;
  padding: 24px;



  .title-bar {
    display: flex;
    justify-content: space-between;

    span {
      font-size: 1.6rem;
    }
  }

  .item {
    display: flex;
    border-bottom: 1px solid #e3e6e8;
    padding: 16px;

    .info {
      color: #6a737c;
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

        &:hover {
          color: #0a95ff;
          cursor: pointer;
        }
      }

      .meta {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 1em 0;
        flex-wrap: wrap;
        row-gap: 1em;

        div {
          .tag {
            padding: .4em;
            margin: .3em;
            background: #e1ecf4;
            color: #39739d;
            font-size: .8em;
          }
        }

        .meta-minimal {
          display: flex;
          align-items: center;
          margin-left: auto;

          img {
            width: 18px;
            height: 18px;
          }

        }
      }
    }
  }
}
</style>