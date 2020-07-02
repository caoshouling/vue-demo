
import proposal from 'mock/bean/proposal.js'

const state = {
  main: proposal.prpMain
}
const mutations = {
  CLEAR_SUMPREMIUM:(state,data) =>{

  }
}
const actions = {
    clearSumPremium:({ commit },data) =>{
        console.log('-----main clearSumPremium----')
        commit('CLEAR_SUMPREMIUM', data)
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

