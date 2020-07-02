
import proposal from 'mock/bean/proposal.js'

const state = {
  itemcar: proposal.prpItemcar
}

const mutations = {
  CHG_ENGINENO: (state, data) => {
    console.log("改变engineNo -CHG_ENGINENO")
    state.itemcar.engineNo = data;
    
    state.itemcar.licenseNo = data + "000000000";
    
  },
  SET_ENGINENO: (state, data) => {
    console.log("设置engineNo -SET_ENGINENO")
    state.itemcar.engineNo = data;
  },
  SET_CARKINDCODE: (state, data) => {
    console.log("设置engineNo -SET_ENGINENO")
    state.itemcar.carkindCode = data;
  }
}

const actions = {
  chgEngineNo({ commit }, data) {
     commit('CHG_ENGINENO', data)
  },
  setEngineNo({ commit }, data) {
    commit('CHG_ENGINENO', data)
    //commit('SET_ENGINENO', data)
 },
 setCarkindCode({ commit }, data) {
  commit('SET_CARKINDCODE', data)
  //commit('SET_ENGINENO', data)
}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

