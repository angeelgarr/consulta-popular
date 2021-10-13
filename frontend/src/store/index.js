import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address: "",
    ethereum: null,
    accounts: [],
    account: null,
    provider: null,
    signer: null,
    contract: null,
    contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS,
    mining: false,
    error: {
      name: "",
      message: "",
    },
    options: [],
  },
  mutations,
  actions,
  getters: {
    getState: (state) => state,
  },
});
