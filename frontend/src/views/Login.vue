<template>
  <div class="container">
    <div class="content">
      <form class="box">
        <div class="form-warp">
          <label for="user">用户名</label>
          <input type="text" name="user" v-model="un" required>
          <!-- <label for="email">邮箱</label>
          <input type="email" name="email" v-model="email" required> -->
          <label for="password">密码</label>
          <input type="password" name="password" v-model="pw" required>
          <input @click.prevent="submit()" id="submit" value="登录" type="button">
          <span style="display:flex;align-self:center">没有账户？<router-link to="/users/signup">去注册</router-link></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useStore } from "vuex";
import swal from 'sweetalert';
import auth from "../store/auth";
import router from "../router";
const store = useStore();
let un = ref("");
let pw = ref("");
let savetoken = ref("")
let submit = () => {
  const json = {
    username: un.value,
    password: pw.value,
    token: savetoken.value
  };
  if (un.value != "" && pw.value != "") {
    axios.post('https://www.codehelp.cn:3000/api/login', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if ("user" in res.data) {
        window.localStorage.setItem('key', res.data.token);
        store.commit('setKey', res.data.token);
        console.log(res.data);
        auth()
      };
      if (res.data.icon == 'success') {
        swal(res.data.message, "", res.data.icon); router.push('/');
      }
      else { swal(res.data.message, "", res.data.icon); init(); }
    });
    init()
  }
}

let init = () => {
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LfLxjEkAAAAAKqC5eb114rskTgbpfYh0qSIrOcx", {
        action: "demo",
      })
      .then(function (token) {
        savetoken.value = token;
      });
  });
}
if(store.state.isAuth)router.push('/')
init()
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  vertical-align: baseline;

  .content {
    display: flex;
    width: 100%;
    max-width: 1264px;
    padding: 24px;
    justify-content: center;

    form {
      width: 100%;
      max-width: 316px;
      box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05), 0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);

      .form-warp {
        display: flex;
        flex-direction: column;
        padding: 2rem;

        label {
          font-weight: 600;
        }

        input {
          flex: 1;
          padding: .6em .5em .7em;
          outline: rgb(107, 137, 147);
          border: 1px solid #babfc4;
          border-radius: 3px;
          margin: .3em 0 1em;

          &:focus {
            border: 1px solid #6bbbf7;
            box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
          }
        }

        [type='button'] {
          background: #0a95ff;
          color: #fff;

          &:hover {
            background: #0074cc;
          }
        }
      }
    }
  }
}
</style>
