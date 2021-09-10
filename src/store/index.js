import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        items: null,
        dailyMovies: null,
        weeklyMovies: null,
        selectedDate: null,
        loading: false,
    },
    mutations: {
        set_daily_movies: (state, list) => {
            state.dailyMovies = list
        },
        set_weekly_movies: (state, list) => {
            state.weeklyMovies = list
        },
    }
});