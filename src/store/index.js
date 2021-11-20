import { createStore } from 'vuex'

export default createStore({
    state: {
        searchValue: String
    },
    getters: {
        getSearchValue: (state) => {
            return state.searchValue;
        }
    },
    mutations: {
        setSearchValue: (value) => {
            this.state.searchValue = value;
        }
    },
    actions: {},
    modules: {}
})