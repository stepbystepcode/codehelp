<template>
    <RouterLink to="/questions/ask"><button>提问</button></RouterLink>
</template>
<script setup></script>
<style lang="scss" scoped>
a {
    display: flex;
    justify-content: end;
    text-decoration: none;

    button {

        border: 1px solid #7aa7c7;
        box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.7);
        padding: 10px;
        font-size: .9em;
        color: #39739d;
        margin: 0 2.3em;
        text-decoration: none;
        border-radius: 3px;

        background: #0a95ff;
        color: #fff;

        &:hover {
            background: #0074cc;
        }
    }
}
</style>