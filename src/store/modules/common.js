// initial state
// shape: [{ id, quantity }]
const state = {
  minHeight: '500px'
}

const mutations = {
  SET_MINHEIGHT: (state, data) => {
    state.minHeight = data
  }
}

const actions = {
  setMinHeight: ({ state, commit }, minHeight) => {
    commit('SET_MINHEIGHT', minHeight)
  }
}

const getters = {
  getMinHeight: state => {
    return state.minHeight
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
