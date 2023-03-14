<template>
    <router-link :to="{ name: '' }" class="card">
        <v-card outline width="450">
          
            <v-card-title primary-title>{{ post.title }}</v-card-title>
            <v-card-text>{{ post.body }}</v-card-text>
              <div class="author_infor">
                    <div>
                        <h3 class="username">Tuan</h3>
                        <p class="email">Tuan1@gmail.com</p>
                    </div>

                </div>
        </v-card>
    </router-link>
</template>
<script>
export default {
    name: "PostCard",
    props: ['post']
}
</script>
<style lang="scss" scoped>
.v-card {
    margin-bottom: 30px;
    border-radius: 20px;
    background-color: antiquewhite;
    height: 250px;

    .author_infor {
        display: flex;
        justify-content: end;
        div {
            margin-right: 20px;
        }
    }


}
</style>