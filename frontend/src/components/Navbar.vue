<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">首页</RouterLink>
      </li>
      <li>
        <RouterLink to="/questions" class="question">问题</RouterLink>
      </li>
      <li>
        <RouterLink to="/tags" class="tags">标签</RouterLink>
      </li>
      <li>
        <RouterLink to="/users" class="user">用户</RouterLink>
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
  setTimeout(() => {
    if (window.location.href.includes('users'))
      document.querySelector('.user').classList.add('router-link-active');
    else
      document.querySelector('.user').classList.remove('router-link-active');
    if ((window.location.href.includes('questions') || window.location.href.includes('search')) && !window.location.href.includes('tagged'))
      document.querySelector('.question').classList.add('router-link-active');
    else
      document.querySelector('.question').classList.remove('router-link-active');
    if (window.location.href.includes('tags') || window.location.href.includes('tagged'))
      document.querySelector('.tags').classList.add('router-link-active');
    else
      document.querySelector('.tags').classList.remove('router-link-active');
  }, 10);

})


</script>

<style lang="scss" scoped>
nav {
  @media only screen and (max-width: 640px) {
    display: none;
  }

  min-width: 164px;
  border-right: 2px solid #0c0d0e0d;
  display: flex;
  z-index: 9;

  ul {
    top: 74px;
    width: 164px;
    height: fit-content;
    position: fixed;

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