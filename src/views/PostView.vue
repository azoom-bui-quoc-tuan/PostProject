<template>
    <div class="post-page">
        <Loading :active="isLoading" :is-full-page="true"></Loading>
        <v-app class="app-wrap">
            <div class="head">

                <v-btn @click="addPost()">Add Post</v-btn>
                <div class="search-form">

                    <v-text-field outlined clearable placeholder="Search a post ..."></v-text-field>
                    <v-select outlined label="Select author" :items="items"></v-select>
                    <v-btn @click="search()">Search Post</v-btn>
                </div>
            </div>
            <div class="body">
                <PostCard v-for="post in allPosts" :post="post" :key="post.id"></PostCard>
            </div>
        </v-app>

    </div>
</template>
<script>
import { get, dispatch } from "vuex-pathify"
import PostCard from "../components/PostCard.vue"

export default {
    name: "PostView",
    components: { PostCard },
    computed: {
        allPosts: get("allPosts"),
        isLoading: get("isLoading")
    },
    data() {
        return {
            items: [1, 2, 4]
        }
    },
    async created() {
        await dispatch("getAllPosts");
    }

}
</script>
<style lang="scss" scoped>
.post-page {
    .app-wrap {
        margin-top: 10px !important;
        height: 150px;

        .head {
            position: sticky;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;




            .search-form {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 20px;
                gap: 12px;

                ::v-deep .v-text-field__details {
                    display: none;
                }

                ::v-deep .v-input__slot {
                    margin-bottom: 0px
                }

            }
        }

        .body {
            padding: 30px 260px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }


    }
}
</style>