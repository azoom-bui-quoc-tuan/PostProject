<template>
    <header class="app_header">
        <router-link :to="{ name: '' }">
            <h1>MyBlog</h1>
        </router-link>
        <router-link :to="{ name: '' }">
            <h3 v-if="currentUser">
                {{ currentUser?.name || currentUser.username }}
            </h3>
        </router-link>
    </header>
</template>
<script>
import { get } from 'vuex-pathify'
export default {
    name: "AppHeader",
    computed: {
        currentUser: get("currentUser")
    }
}
</script>
<style lang="scss" scoped>
.app_header {
    background-color: rgba(63, 167, 50, 0.842);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 70px;
    padding: 31px;
    margin-top: -60px;

    * {
        color: white;
    }

}
</style>