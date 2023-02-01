<template>
    <div class="container">
        <div class="content">

            <div v-for="user in users" :key="usesr"><router-link :to="`/users/${user.username}`"><img
                        :src="`http://47.93.214.2:3000/avatar/${user.username}.jpg`" alt="">{{
        user.username
                        }}</router-link></div>

        </div>
    </div>
</template>


<script setup>
import axios from 'axios';
import { ref } from 'vue';
let users = ref([]);
axios.get('http://47.93.214.2:3000/api/users').then(res => users.value = res.data);
</script>

<style lang="scss" scoped>
.content {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    div {

        padding: 5px 6px 7px 7px;

        img {
            width: 48px;
            height: 48px;
            border-radius: 3px;
        }
    }
}
</style>