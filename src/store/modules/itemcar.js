
import proposal from 'mock/bean/proposal.js'

const state = {
  itemcar: proposal.itemcar
}

const mutations = {
  CHG_ENGINENO: (state, data) => {
    state.itemcar.engineNo = data;
    if (state.itemcar.engineNo.length > 6) {
        state.itemcar.licenseNo = state.itemcar.engineNo.substring(0,6);
    }
  }
}

const actions = {
    chg_engineNo({ commit }, data) {
     commit('CHG_ENGINENO', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

