import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { getToken, setToken } from "@/utils/storeage";
export default new Vuex.Store({
  state: {
    user: getToken("my-token1"),
  },
  getters: {},
  mutations: {
    getToken(state, user) {
      state.user = user;
      setToken("my-token1", user);
    },
  },
  actions: {},
  modules: {},
});
