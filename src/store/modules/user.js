import * as api from '../../service/getData'
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
      if (res.status === 200) {
        commit('SET_USERINFO', res.data.userinfo)
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
