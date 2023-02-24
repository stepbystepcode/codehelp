<template>

  <header>
    <div>
      <div class="toggle" @click="store.commit('togglebar'); toggle()"><span></span></div>
      <img class="logo" @click="router.push('/')" src="../assets/img/logo.svg" alt="logo">
      <img class="search-icon" src="../assets/img/search.svg" alt="">
      <input type="text" name="" id="" placeholder="搜索问题..." @keydown.enter="search()" v-model="input">
      <div><a v-if="!store.state.isAuth" @click="router.push('/users/login')">登录</a>
        <a v-if="!store.state.isAuth" @click="router.push('/users/signup')">注册</a>
      </div>
      <img v-if="store.state.isAuth" @click="router.push('/users/' + store.state.user.name)" class="avatar"
        :src="`https://www.codehelp.cn:3000/avatar/${store.state.user.name}.webp`" alt="avatar">
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, onMounted } from "vue"
const router = useRouter()
const store = useStore();
const input = ref('');
const search = () => {
  router.push({ name: 'Search', query: { q: input.value } })
}
onMounted(() => {
  if (document.body.offsetWidth <= 640) store.commit('togglebar')
})
const toggle = () => {
  document.querySelector(".toggle").classList.toggle('selected');
  document.querySelector(".toggle").children[0].classList.toggle('open');
}
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
  z-index: 99;

  div {
    display: flex;
    justify-content: end;
    align-items: center;
    max-width: 1264px;
    width: 100%;

    .toggle {
      flex: 0 0 52px;
      height: 52px;
      justify-content: center;



      span {
        width: 16px;
        height: 2px;
        background-color: #525960;
        position: relative;

        &::before {
          position: absolute;
          content: '';
          left: 0;
          top: -5px;
          transition: top, transform;
          transition-duration: .1s;
          transition-timing-function: ease-in-out;
          width: 16px;
          height: 2px;
          background-color: #525960;
        }

        &::after {
          position: absolute;
          content: '';
          left: 0;
          top: 5px;
          transition: top, transform;
          transition-duration: .1s;
          transition-timing-function: ease-in-out;
          width: 16px;
          height: 2px;
          background-color: #525960;
        }


      }





      @media only screen and (min-width: 640px) {
        display: none;
      }
    }

    .selected {
      .open {
        background-color: transparent !important;

        &::before {
          top: 0;
          transform: rotate(-45deg);
        }

        &::after {
          top: 0;
          transform: rotate(45deg);
        }
      }
    }

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

      @media only screen and (max-width: 640px) {
        position: fixed;
        right: 4em;
        left: unset;
      }
    }

    input {
      flex: 1;
      padding: .6em 3em .7em;
      outline: rgb(107, 137, 147);
      border: 1px solid #babfc4;
      border-radius: 3px;

      @media only screen and (max-width: 640px) {
        display: none;
      }

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
