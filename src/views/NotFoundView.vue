<template>
    <div class="page-wrapper">

        <h1 class="title">Page Not Found</h1>
        <p>Click <router-link :to="{ name: 'home' }">here</router-link></p> to go back home page
    </div>
</template>
<script>
export default {
    name: "NotFound"
}
</script>
<style lang="scss" scoped></style>