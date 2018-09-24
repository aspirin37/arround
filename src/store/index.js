import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    isCapShowed: false,
}
const actions = {}

const mutations = {
    toggleCap(state) {
        state.isCapShowed = !state.isCapShowed
    },
    SET_SOME_OBJECT_VALUE: (state, { options }) => {
        if(options.value) {
            Vue.set(state[options.vari], options.key, options.value)
        } else {
            Vue.delete(state[options.vari], (options.key))
        }
    },
    CLEAR_SOME_OBJECT: (state, vari) => {
        state[vari] = {}
    },
    SET_SOME_STATE_VALUE: (state, { options }) => {
        state[options.key] = options.value
    },
    SET_GRID_TYPE: (state, val) => {
        state.gridType = val
    }
}

const getters = {}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})
