import * as api from '../../service/getData'
import Tool from './../../utils/Tool'
const state = {
  userInfo: null
}

const mutations = {
  SET_USERINFO: (state, data) => {
    state.userInfo = data
  }
}

const actions = {
  setUserInfo: ({ state, commit }, userInfo) => {
    commit('SET_USERINFO', userInfo)
  },
  getUserInfo: ({ state, commit }) => {
    api.getUserInfo().then(function (res) {
      if (res.userinfo) {
        commit('SET_USERINFO', res.userinfo)
      } else {
        Tool.delCookie('ngtoken')
      }
    })
  }
}

const getters = {
  getUserInfo: state => {
    return state.userInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
