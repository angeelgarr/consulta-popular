import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address: "",
    network: "",
  },
  mutations: {
    setState(state, payload) {
      state[payload.field] = payload.value;
    },
  },
  getters: {
    getState: (state) => state,
  },
});
