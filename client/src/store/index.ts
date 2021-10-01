import Vue from "vue";
import Vuex from "vuex";
import framesData from '../helpers/storeData';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameBoards: [framesData]
  },

  mutations: {

    addNewBoard(state, data) {
      state.gameBoards.push(data)
    },

    setStrikeOrSpare(state, data) {
      state.gameBoards[data.boardId].frameScores[data.frameId].strikeOrSpare = data.strikeOrSpare;
    },
    setTotalScore(state, data) {
      state.gameBoards[data.boardId].totalScore = data.total;
    },

    addToTotalFrameScore(state, data) {
      state.gameBoards[data.boardId].frameScores[data.frameId].score = state.gameBoards[data.boardId].frameScores[data.frameId].score + data.score;
    },

    setFrameScore(state, data){
      state.gameBoards[data.boardId].frameScores[data.frameId].score = data.total;
    },

    setPassRound(state, data) {
      state.gameBoards[data.boardId].passRound = data.value;
    },

    // addToTotalScore(state, data) {
    //   state.gameBoards[data.boardId].totalScore = data.score
    // },

    resetFrame(state, data){
      state.gameBoards[data.boardId].frameScores[data.frameId].score = data.score;
      state.gameBoards[data.boardId].frameScores[data.frameId].strikeOrSpare = data.strikeOrSpare;
    }
  },
  actions: {},
  modules: {},
});
