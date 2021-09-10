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
          max="2021-09-19"
          min="2014-01-01"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="red"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            :loading="loading"
            color="primary"
            @click="getMovies(inputDate)"
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
    
import { get_daily_movies, get_weekly_movies } from "@/assets/api";
export default {
  name: 'App',

  components: {
    MainView,
  },

  data: () => ({
    items: null,
    weeklyItems: null,
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

    const [success, dailyMovies] = await get_daily_movies(this.date);
    console.log(dailyMovies)
    if (success) this.$store.commit("set_daily_movies", dailyMovies);
    this.items = dailyMovies;

    this.$store.state.loading = false
  },
  computed:{
    selectedDate(){
      return this.$store.state.selectedDate;
    },
    loading(){
      return this.$store.state.loading;
    }
  },
  methods:{
    async getMovies(date){
      this.$store.state.loading = true
      date = date.replace(/-/g, "")
      var [success, dailyMovies] = await get_daily_movies(date);
      
      if (dailyMovies == null){
        console.log(dailyMovies)
        this.modal = false;
        this.$store.state.loading = false
        alert('해당 날짜의 데이터가 업데이트 되지 않았습니다.')
        return
      }
      if (success) this.$store.commit("set_daily_movies", dailyMovies);
      this.items = dailyMovies;
      
      var weeklyMovies;
      [success, weeklyMovies] = await get_weekly_movies(date);
      if (success) this.$store.commit("set_weekly_movies", weeklyMovies);
      this.weeklyItems = weeklyMovies;
      this.modal = false;
      this.$store.state.loading = false
    },
  
  }
};
</script>
<style  scoped>
.header {
  align-items: center;
  justify-content: center;
}
</style>