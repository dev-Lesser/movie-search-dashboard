<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
      class="header"
    >
    <v-app-bar-title>
      영화 박스오피스 순위
    </v-app-bar-title>
    <v-spacer />
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="inputDate"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            width="300"
            hide-details
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="inputDate"
          scrollable
          locale="ko-kr"
          max="2021-09-09"
          min="2014-01-01"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="getDailyMovies(inputDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      </v-app-bar>
    <v-main>
      <MainView />
    </v-main>
  </v-app>
</template>

<script>
import MainView from './components/MainView';
import { get_daily_movies } from "@/assets/api";
export default {
  name: 'App',

  components: {
    MainView,
  },

  data: () => ({
    loading: false,
    items: null,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    modal: false,
    idate: null,
  }),
  async created(){
    this.$store.state.loading = true
    this.idate = new Date()
    this.idate.setDate(this.idate.getDate()-1)
    this.inputDate = (new Date(this.idate - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    this.date = this.inputDate.replace(/-/g, "")
    // this.date.setDate(this.date.getDate() - 1);
    const [success, dailyMovies] = await get_daily_movies(this.date);
    if (success) this.$store.commit("set_daily_movies", dailyMovies);
    this.items = dailyMovies;

    this.$store.state.loading = false
  },
  computed:{
    selectedDate(){
      return this.$store.state.selectedDate;
    }
  },
  methods:{
    async getDailyMovies(date){
      this.$store.state.loading = true
      date = date.replace(/-/g, "")
      const [success, dailyMovies] = await get_daily_movies(date);
        if (success) this.$store.commit("set_daily_movies", dailyMovies);
        this.items = dailyMovies;
        this.modal = false;
        this.$store.state.loading = false
    }
  }
};
</script>
<style  scoped>
.header {
  align-items: center;
  justify-content: center;
}
</style>