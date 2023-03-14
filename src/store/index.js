import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";
import ky from "../plugins/ky";

Vue.use(Vuex);
const state = {
    isLoading: false,
    currentUser: {},
    allPosts: [],
};

const mutations = {
    ...make.mutations(state),
};

const actions = {
    async getAllPosts({ commit }) {
        const posts = await ky.get("posts").json();
        commit("SET_ALL_POSTS", posts);
    },
};

export default new Vuex.Store({
    plugins: [pathify.plugin],
    state,
    mutations,
    actions,
});