<template>
<div>
    <carousel-3d
    :animationSpeed="500"
    :width="350"
    :height="700"
    :controls-visible="true" 
    v-if="dailyMovies !== null"
    >
        <slide  v-for="(slide, i) in dailyMovies" :index="i" :key="i">
            <v-chip
                class="rank"
                color="pink"
                label
                text-color="white"
                >
                <v-icon left>
                    mdi-heart
                </v-icon>
                {{i + 1}} 위
            </v-chip>
        
            <figure >
                <img v-bind:src="STORAGE_URL + slide.movieCd + '.jpg'" >
                
                <figcaption>
                    <v-card-title> {{slide.movieNm}} 
                        [<v-icon light :color="getRankIcon(slide.rankInten)[0]">
                            {{getRankIcon(slide.rankInten)[1]}}
                            
                        </v-icon>
                        {{getRankIcon(slide.rankInten)[2]}}
                        ]
                        <v-icon  color="yellow" v-if="slide.rankOldAndNew=='NEW'">mdi-new-box</v-icon>
                        
                    </v-card-title>
                    <v-divider />
                    <v-card-actions>
                        전일 대비 관객 : 
                        <v-icon 
                            light 
                            :color="getRankIcon(slide.audiInten)[0]">
                                {{getRankIcon(slide.audiInten)[1]}}
                        </v-icon>
                            {{getRankIcon(slide.audiInten)[2]}}
                        명
                        <v-spacer />
                        개봉일   <v-chip small>{{slide.openDt}}</v-chip> 
                    </v-card-actions>
                    <v-divider />
                    <v-card-actions>
                        일일매출액 : {{numberToKorean(slide.salesAmt).split('만')[0]}} 만원
                        <v-spacer />
                        누적매출 : {{numberToKorean(slide.salesAcc).split('만')[0]}} 만원
                    </v-card-actions>
                    <v-divider />
                    <v-card-actions>
                        <p> 일일 관객수 : {{numberToKorean(slide.audiCnt)}} 명</p> 
                        <v-spacer />
                        <p> 누적 관객수 : {{numberToKorean(slide.audiAcc).split('만')[0]}} 만명</p> 
                    </v-card-actions>
                
                </figcaption>
            
            </figure>
            
        </slide>
    </carousel-3d>
</div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
import secret from '@/assets/secret.json'

export default ({
    data() {
        return {
            isCurrent: 0,
            leftIndex: 10,
            rightIndex: 10,
            STORAGE_URL: secret['STORAGE_URL'],
            

        }
    },
    components: {
        Carousel3d,
        Slide
    },
    computed:{
        dailyMovies(){
            return this.$store.state.dailyMovies;
        },
        loading(){
            return this.$store.state.loading;
        }
    },
    methods:{
        getRankIcon(value){
            if (value === "0") return ["white","mdi-minus", ""]
            else if (value.startsWith("-") ) {
                return ["red","mdi-arrow-down-bold", value.slice(1,)]
            }
            else {
                return ["blue","mdi-arrow-up-bold",value]
            }
        },
        numberToKorean(number){
            number = parseInt(number)
            var inputNumber  = number < 0 ? false : number;
            var unitWords    = ['', '만', '억', '조', '경'];
            var splitUnit    = 10000;
            var splitCount   = unitWords.length;
            var resultArray  = [];
            var resultString = '';

            for (var i = 0; i < splitCount; i++){
                var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
                unitResult = Math.floor(unitResult);
                if (unitResult > 0){
                    resultArray[i] = unitResult;
                }
            }

            for (i = 0; i < resultArray.length; i++){
                if(!resultArray[i]) continue;
                resultString = String(resultArray[i]) + " " + unitWords[i] + " " +resultString;
            }

            return resultString;
        }
    }
})
</script>
<style scoped>

.carousel-3d-container figcaption {
    /* position: absolute; */
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 10px;
    font-size: 11px;
    font-family: 'Jeju Gothic', sans-serif;

}
.rank {
    position: absolute;
    padding: 10px;
    font-size: 12px;
}
</style>