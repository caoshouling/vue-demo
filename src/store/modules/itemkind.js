
import proposal from 'mock/bean/proposal.js'

const state = {
    prpItemkindList: proposal.prpItemkindList ,
}

const mutations = {
  ADD_ITEMKIND: (state, data) => {
    state.prpItemkindList.push(data);
  },
  REMOVE_ITEMKIND: (state, data) => {
    state.prpItemkindList.pop();
  },
}

const actions = {
  add_Itemkind({ commit }, data) {
    commit('ADD_ITEMKIND', data)
  },
  remove_Itemkind({ commit }, data) {
    commit('REMOVE_ITEMKIND', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

