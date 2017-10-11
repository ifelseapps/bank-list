import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex)

const state = {
  search: '',
  completed: false,
  errors: {},
  list: []
}

const mutations = {
  allList(state, list) {
    state.list = list
    state.completed = true
  },

  search(state, value) {
    state.search = value
  }
}

const actions = {
  fetch({ commit }) {
    api.fetch().then((list) => commit('allList', list))
  },

  save({ commit, state }, row) {
    state.completed = false
    api.save(row).then((list) => commit('allList', list))
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
}) 
