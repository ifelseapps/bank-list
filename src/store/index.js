import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex)

const state = {
  list: []
}

const mutations = {
  allList(state, list) {
    state.list = list
  }
}

const actions = {
  fetch({ commit }) {
    api.getList().then((list) => commit('allList', list))
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
}) 
