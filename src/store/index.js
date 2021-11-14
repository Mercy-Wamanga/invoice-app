import Vue from "vue";
import Vuex from "vuex";
import customers from "./modules/customers.js";

Vue.use(Vuex);

//Create store.
export default new Vuex.Store({
  modules: {
    customers,
  },
});
