import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";

Vue.use(Vuex);
const state = {
  isLoading: false,
  currentUser: {},
};

const mutations = {
  ...make.mutations(state),
};

const actions = {};

export default new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  mutations,
  actions,
});
