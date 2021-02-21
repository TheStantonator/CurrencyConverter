import Vuex from "vuex";
import Vue from "vue";
import history from "./modules/history"

Vue.use(Vuex);

// create store
export default new Vuex.Store({
  modules: {
    history
  }
})