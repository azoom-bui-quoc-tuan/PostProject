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
                <PostCard v-for="post in pagePosts" :post="post" :key="post.id"></PostCard>
            </div>
            <div class="footer">
                <v-pagination @input="changePage()" circle color='red' v-model="page" :length="totalPage"
                    total-visible="7"></v-pagination>
            </div>
        </v-app>

    </div>
</template>
<script>
import { get, dispatch, commit } from "vuex-pathify"
import PostCard from "../components/PostCard.vue"
import { LIMIT_PAGE } from "../utils/constants"

export default {
    name: "PostView",
    components: { PostCard },
    computed: {
        allPosts: get("allPosts"),
        pagePosts: get("pagePosts"),
        isLoading: get("isLoading"),
        totalPage() {
            return Math.ceil(this.allPosts.length / LIMIT_PAGE)
        }
    },
    data() {
        return {
            items: [1, 2, 4],
            page: 1,
        }
    },
    methods: {
        async changePage() {
            await dispatch("getPagePosts", this.page)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    },

    async created() {
        commit("SET_IS_LOADING", true)
        await dispatch("getAllPosts");
        await this.changePage();
        commit("SET_IS_LOADING", false)
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
            padding: 30px 250px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }


    }
}
</style>