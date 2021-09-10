<template>
    <v-card>
        <tr v-for="(item, key) in weeklyMovies" :key="key">
            <div v-for="(imovie, movkey) in item['dailyList']" :key="movkey">
                <tr>{{ imovie['movieNm']}}</tr>
            </div>

        </tr>
    </v-card>
</template>

<script>

export default ({
    setup() {
        
    },
    computed:{
        weeklyMovies(){
            return this.$store.state.weeklyMovies;
        }
    }
})
</script>
