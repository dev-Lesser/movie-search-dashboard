<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12 sm12 md12>
        <movie-card />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MovieCard from './MovieCard.vue'
export default {
  components:{
    MovieCard
  }
}
</script>

<style>

</style>