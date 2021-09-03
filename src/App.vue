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
        :return-value.sync="date"
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
          v-model="date"
          scrollable
          locale="ko-kr"
          :max="date"
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
            @click="$refs.dialog.save(date)"
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
    items: null,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    modal: false,
  }),
  async created(){
    const [success, dailyMovies] = await get_daily_movies("20210901");
        if (success) this.$store.commit("set_daily_movies", dailyMovies);
        console.log(dailyMovies)
        this.items = dailyMovies;
  }
};
</script>
<style  scoped>
.header {
  align-items: center;
  justify-content: center;
}
</style>