<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">首页</RouterLink>
      </li>
      <li>
        <RouterLink to="/questions">问题</RouterLink>
      </li>
      <li>
        <RouterLink to="/users">用户</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
watch(route, () => {
  if (window.location.href.includes('users'))
    document.querySelector('ul').children[2].children[0].classList.add('router-link-active');
  else
    document.querySelector('ul').children[2].children[0].classList.remove('router-link-active');
})


</script>

<style lang="scss" scoped>
nav {
  min-width: 164px;
  border-right: 2px solid #0c0d0e0d;
  display: flex;

  ul {
    position: relative;
    top: 24px;
    width: 100%;

    li {
      a {
        color: #525960;
        text-decoration: none;
        display: block;
        padding: 10px 6px 10px 30px;
        font-size: .9em;
      }

      &:hover {
        color: #0c0d0e;
        cursor: pointer;
      }
    }

    .router-link-active {
      background: #f1f2f3;
      border-right: 3px solid #379fef;
    }
  }
}
</style>