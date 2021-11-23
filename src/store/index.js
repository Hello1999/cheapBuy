import { createStore } from 'vuex'

export default createStore({
    state: {
        searchValue: '',
    },
    getters: {
        getSearchValue: (state) => {
            return state.searchValue;
        }
    },
    mutations: {
        setSearchValue: (state, value) => {
            state.searchValue = value
        }

    },
    actions: {},
    modules: {}
})