import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    frameScores: [
      {
        frameId: 0,
        score: 0,
        strikeOrSpare: '',

      },
      {
        frameId: 1,
        score: 0,
        strikeOrSpare: '',
      },
      {
        frameId: 2,
        score: 0,
        strikeOrSpare: '',
      },
      {
        frameId: 3,
        score: 0,
        strikeOrSpare: '',
      },
      {
        frameId: 4,
        score: 0,
        strikeOrSpare: '',
      },
      {
        frameId: 5,
        score: 0,
        strikeOrSpare: '',
      },
      {
        frameId: 6,
        score: 0,
        strikeOrSpare: '',
      },
      {
        frameId: 7,
        score: 0,
        strikeOrSpare: '',
      },
      {
        frameId: 8,
        score: 0,
        strikeOrSpare: '',
      },
      {
        frameId: 9,
        score: 0,
        strikeOrSpare: '',
      },
    ],
    passRound: false,
    totalScore: 0
  },
  mutations: {
    setStrikeOrSpare(state, frame) {
      state.frameScores[frame.id].strikeOrSpare = frame.strikeOrSpare;
    },

    setTotalFrameScore(state, frame) {
      state.frameScores[frame.id].score = frame.score;
    },
    addToTotalFrameScore(state, frame) {
      state.frameScores[frame.id].score = state.frameScores[frame.id].score + frame.score;
    },

    setPassRound(state, value) {
      state.passRound = value;
    },

    addToTotalScore(state, value) {
      state.totalScore = state.totalScore + value;
    }
  },
  actions: {},
  modules: {},
});
