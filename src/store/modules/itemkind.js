
import proposal from 'mock/bean/proposal.js'

const state = {
    prpItemkindList: proposal.prpItemkindList ,
}

const mutations = {
  ADD_ITEMKIND: (state, data) => {
    
    console.log('当前itemkindList长度：'+state.prpItemkindList.length+'------VueX---添加itemkind--------');
    state.prpItemkindList.push(data);
  },
  REMOVE_ITEMKIND: (state, data) => { 
    console.log('当前itemkindList长度：'+state.prpItemkindList.length+'------VueX---删除itemkind--------');
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

