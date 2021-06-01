import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {


    currentLevel: 40,
    currentExp: 1000,

    advance: false,

    selectedAdvance: "gameHourCal",
    customPassBonus: "0%",

    rankedHour: 1,
    battlegroundsHour: 0,

    customExp: 3000,






  },
  getters: {
  },
  mutations: {
    changeCurrentLevel(state, payload) {
      state.currentLevel = payload
    },
    changeCurrentExp(state, payload) {
      state.currentExp = payload
    },

    toggleAdvance(state, payload) {
      state.advance = payload
    },

    toggleSelectedAdvance(state, payload) {
      state.selectedAdvance = payload
    },
    changeCustomPassBonus(state, payload) {
      state.customPassBonus = payload
    },
    changeCustomExp(state, payload) {
      state.customExp = payload
    },

    changeRankedHour(state, payload) {
      state.rankedHour = payload
    },
    changeBattlegroundsHour(state, payload) {
      state.battlegroundsHour = payload
    },


  },
  actions: {
  },
  modules: {
  }
})
