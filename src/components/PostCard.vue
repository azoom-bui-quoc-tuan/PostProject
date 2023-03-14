<template>
    <router-link :to="{ name: '' }" class="card">
        <v-card outline width="450">
            <div>
                <h3 class="username">Tuan</h3>
                <p class="email">Tuan1@gmail.com</p>
            </div>
            <v-card-title primary-title>hello</v-card-title>
            <v-card-text>xin chao xin chao</v-card-text>
        </v-card>
    </router-link>
</template>
<script>
export default {
    name: "PostCard"
}
</script>
<style lang="scss" scoped>
.v-card{
    margin-bottom: 30px;
    border-radius: 20px;
    background-color: antiquewhite;
}
</style>