const state = {
    isCapShowed: false,
}

const mutations = {
    toggleCap(state) {
        state.isCapShowed = !state.isCapShowed
    }
}

const actions = {}

const getters = {}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})
