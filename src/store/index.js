import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        showNav: true,
        items: null,
        dailyMovies: null,
        selectedDate: null,
    },
    mutations: {
        set_daily_movies: (state, list) => {
            state.dailyMovies = list
        },
    }
});