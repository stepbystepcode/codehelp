<template>
    <div class="container">
        <div class="content">
        
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from '../store/index'
import axios from "axios";
import { useRouter } from 'vue-router';
const router = useRouter();
const id = ref(router.currentRoute.value.fullPath.split('/')[2])
axios.get('http://47.93.214.2/api/detail?' + id.value)
</script>

<style lang="scss" scoped>

</style>