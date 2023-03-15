import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";
import ky from "../plugins/ky";
import { LIMIT_PAGE } from "@/utils/constants";

Vue.use(Vuex);
const state = {
  isLoading: false,
  currentUser: {},
  allPosts: [],
  pagePosts: [],
};

const mutations = {
  ...make.mutations(state),
};

const actions = {
  async getAllPosts({ commit }) {
    const posts = await ky.get("posts").json();
    commit("SET_ALL_POSTS", posts);
  },
  async getPagePosts({ state, commit }, currentPage) {
    const offset = (currentPage - 1) * LIMIT_PAGE;
    const posts = state.allPosts.slice(offset, offset + LIMIT_PAGE);
    commit("SET_PAGE_POSTS", posts);
  },
};

export default new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  mutations,
  actions,
});
