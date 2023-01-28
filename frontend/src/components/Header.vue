<template>

  <header>
    <div>
      <img class="logo" onclick="window.location='/'" src="../assets/img/logo.svg" alt="logo">
      <img class="search-icon" src="../assets/img/search.svg" alt="">
      <input type="text" name="" id="" placeholder="搜索问题...">
      <a v-if="!store.state.isLogin" href="/users/login">登录</a>
      <a v-if="!store.state.isLogin" href="/users/signup">注册</a>
      <img v-if="store.state.isLogin" onclick="window.location.replace('/users/d')" class="avatar"
        src="../assets/img/avatar.svg" alt="avatar">
    </div>
  </header>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
// console.log(store.state.isLogin);
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  width: 100%;
  border-top: 5px solid #379fef;
  background: #f8f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06), 0 3px 8px hsla(0, 0%, 0%, 0.09);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1264px;
    width: 100%;

    a {
      border: 1px solid #7aa7c7;
      background-color: #e1ecf4;
      box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.7);
      padding: 10px;
      font-size: .9em;
      color: #39739d;
      margin: 0 .3em;
      text-decoration: none;
      border-radius: 3px;

      &:hover {
        background: #b3d3ea;
      }

      &+a {
        background: #0a95ff;
        color: #fff;

        &:hover {
          background: #0074cc;
        }
      }
    }

    .logo {
      width: 185px;

      &:hover {
        background: #e3e6e8;
      }
    }

    .search-icon {
      width: 18px;
      height: 18px;
      position: relative;
      left: 2em;
    }

    input {
      flex: 1;
      padding: .6em 3em .7em;
      outline: rgb(107, 137, 147);
      border: 1px solid #babfc4;
      border-radius: 3px;

      &:focus {
        border: 1px solid #6bbbf7;
        box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
      }
    }

    .avatar {
      width: 1.5rem;
      height: 1.5rem;
      padding: 0 1rem;
    }
  }
}
</style>