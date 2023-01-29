<template>
    <div class="container">
        <div class="content">
            <div v-for="user in users" :key="usesr">{{user.username}}</div>
            
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
let users = ref([]);
axios.get('http://47.93.214.2:3000/api/users').then(res=>users.value=res.data);
</script>

<style lang="scss" scoped>

</style>