<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
      class="header"
    >
    <router-link to="/">
    <v-card-title >
      영화 박스오피스 순위
    </v-card-title>
    </router-link>
    <v-spacer />
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="selectedDate"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="selectedDate"
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
          :max=maxDate
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
      <transition
        name="fade-out-in-simultaneous"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
      >
        <keep-alive include="main">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
    
import { get_daily_movies } from "@/assets/api";
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    items: null,
    modal: false,
    idate: null,
    maxDate: null,
  }),
  async created(){
    this.$store.state.loading = true
    this.idate = new Date()
    this.idate.setDate(this.idate.getDate()-1)
    this.inputDate = (new Date(this.idate - (new Date()).getTimezoneOffset() )).toISOString().substr(0, 10);
    this.maxDate = this.inputDate
    this.$store.commit("set_selected_date", this.inputDate)
    this.date = this.inputDate.replace(/-/g, "")
    var [success, dailyMovies] = await get_daily_movies(this.date);

    if (success) this.$store.commit("set_daily_movies", dailyMovies);
    else {
      this.modal = false;
      this.$store.state.loading = false
      alert('해당 날짜의 데이터가 업데이트 되지 않았습니다.')
      return
    }
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
    beforeLeave(el) {
      const bcr = el.getBoundingClientRect();
      el.style.position = "fixed";
      el.style.top = `${bcr.y}px`;
      el.style.zIndex = -1;
    },
    afterLeave(el) {
      el.style.position = null;
      el.style.top = null;
      el.style.zIndex = null;
    },
    async getMovies(date){
      this.$store.state.loading = true
      this.$store.commit("set_selected_date", date)

      var convertDate = date.replace(/-/g, "")
      this.inputDate = convertDate;
      var [success, dailyMovies] = await get_daily_movies(convertDate);
      if (dailyMovies == null){

        this.modal = false;
        this.$store.state.loading = false
        alert('해당 날짜의 데이터가 업데이트 되지 않았습니다.')
        return
      }
      if (success) this.$store.commit("set_daily_movies", dailyMovies);
      this.items = dailyMovies;
      
    
      this.modal = false;
      
      this.$store.state.loading = false
      
    },
  
  }
};
</script>
<style  scoped>
@import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);
.header {
  align-items: center;
  justify-content: center;
  font-family: 'Jeju Gothic', sans-serif;
}
</style>