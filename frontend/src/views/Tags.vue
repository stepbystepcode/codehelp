<template>
    <div class="container">
        <div class="content">
            <span style="font-size:1.6rem">标签</span>
            <input type="text" placeholder="搜索标签" v-model="search">
            <div class="grid">
                <div class="box" v-for="tag in withSearch" :key="usesr"><router-link :to="`/questions/tagged/${tag}`">{{
                    tag
                }}</router-link></div>
            </div>
        </div>
    </div>
</template>


<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
const search = ref('')
let tags = ref(['javascript', 'python', 'java', 'c#', 'php', 'android', 'html', 'jquery', 'c++', 'css', 'ios', 'mysql', 'sql', 'r', 'node.js', 'reactjs', 'arrays', 'c', 'asp.net', 'json', 'ruby-on-rails', 'python-3.x', '.net', 'sql-server', 'swift', 'django', 'objective-c', 'angular', 'excel', 'pandas', 'angularjs', 'regex', 'ruby', 'linux', 'iphone', 'ajax']);
const withSearch = computed(() => {
    return tags.value.filter((p) => p.includes(search.value))
})
</script>

<style lang="scss" scoped>
.content {
    padding: 24px;

    .grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .box {
        padding: 24px;
        border: 1px solid #e3e6e8;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        margin-top: 12px;
        padding: 5px 6px 7px 7px;

        img {
            width: 48px;
            height: 48px;
            border-radius: 3px;
        }

        a {
            display: inline-block;
            margin: 2px;
            background: #e1ecf4;
            padding: 8px;
            color: #39739d;
            border-radius: 3px;
            font-size: 12px;
            text-decoration: none;

            &:hover {
                color: #2c5877;
                background-color: #d0e3f1;
                border-color: #00000000;
            }
        }
    }
}

input {
    flex: 1;
    outline: rgb(107, 137, 147);
    border: 1px solid #babfc4;
    border-radius: 3px;
    display: flex;
    padding: .6em .7em;

    &:focus {
        border: 1px solid #6bbbf7;
        box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
    }
}
</style>