import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        items: null,
        dailyMovies: null,
        weeklyMovies: null,
        selectedDate:  new Date(),
        loading: false,
        chartData: null,
    },
    mutations: {
        set_daily_movies: (state, list) => {
            state.dailyMovies = list
        },
        set_selected_date: (state, Date) => {
            state.selectedDate = Date
        },
    }
});