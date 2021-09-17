<template>
<v-container fluid>
    <v-layout wrap >
        <v-flex xs12 sm12 md12 class="contents">
            <transition 
            appear 
            @before-enter="beforeEnter" 
            @enter="enter" 
            :css="true"> 
                <v-card-title>영화 제목</v-card-title>
            </transition>
        </v-flex>
        <v-flex xs12 sm12 md12 class="contents">
        
            <div class="pixel"> 
                <img :src="STORAGE_URL + movieCd + '.jpg'" >
                <img  :src="STORAGE_URL + movieCd + '.jpg'"  >
            </div>
    
            
        </v-flex>
    
    </v-layout>
</v-container>

        
</template>
<script>
import secret from '@/assets/secret.json'
import gsap from 'gsap'
export default {
    data() {
        return {
            movieCd : this.$route.params.movieCd,
            method : this.$route.params.method,
            STORAGE_URL: secret['STORAGE_URL'],
            intervalID: null,
            isLoaded: false,
            canvas: document.getElementById('image'),
            img: new Image(),
            ctx: null,
        }
    },
    mounted(){


    },
    methods:{
        onImgLoad () {
            this.isLoaded = true
        },
        beforeEnter(el) { 
            el.style.opacity = 0 
            el.style.transform = 'scale(0,0)'

        }, 
        enter(el, done) { 
            gsap.to(el, { 
                duration: 1, 
                opacity: 1, 
                scale: 1, 
                ease: 'bounce.out', 
                onComplete: done 
            })

        },
    



        
    }
}
</script>
<style scoped>

.contents { 
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.pixel {
    position: relative;
    background: #000;
}
.pixel img {
    position: absolute;
    width: 400px;
    height: auto;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
}
.pixel img:last-child {
    transition: 1s;
    transform: scale(1);
}
.pixel:hover img:last-child {
    opacity: 0;
}
</style>