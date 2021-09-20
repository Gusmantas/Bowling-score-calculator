import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    totalScore: 0
  },
  mutations: {
    setTotalScore(state, score){
      state.totalScore = score;
    }
  },
  actions: {},
  modules: {},
});
