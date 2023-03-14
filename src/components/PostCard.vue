<template>
    <router-link :to="{ name: '' }" class="card">
        <v-card outline width="450">

            <v-card-title primary-title>{{ post.title }}</v-card-title>
            <v-card-text>{{ post.body }}</v-card-text>
            <div class="author_infor">
                <div>
                    <h3 class="username">{{ userInfor.name }}</h3>
                    <p class="email">{{ userInfor.email }}</p>
                </div>

            </div>
        </v-card>
    </router-link>
</template>
<script>
import ky from '../plugins/ky'
export default {
    name: "PostCard",
    props: ['post'],
    data() {
        return {
            userInfor: {}
        }
    },
    methods: {
        async getUserById() {
            const user = await ky.get(`users/${this.post.userId}`).json()
            console.log("user", user)
            this.userInfor = user
        }

    },
    created() {
        this.getUserById()
    }
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

            .username,
            .email {
                font-style: italic
            }
        }
    }


}
</style>