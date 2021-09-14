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
        
            <transition 
            appear 
            @before-enter="beforeEnter" 
            @enter="enter" 
            :css="false"> 
                <img width=450 height=700 :id="`image`" :src="STORAGE_URL + movieCd + '.jpg'" @load="onImgLoad" >
            </transition>
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
        
        this.ctx = this.canvas.getContext('2d')

        
        window.onload = this.firstDraw();

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
        firstDraw(){
            var initialImageURL = this.STORAGE_URL + this.movieCd + '.jpg'
            this.draw(initialImageURL); 
        },
        draw (imgURL) { 
            this.img.crossOrigin="anonymous"; 
            this.img.src = imgURL; 
            let self = this;
            this.img.onload = function() { 
                self.canvas.height = self.img.height/4; 
                self.canvas.width = self.img.width/4; 
                self.ctx.drawImage(self.img, 0, 0, self.canvas.width, self.canvas.height); 
                self.pixelate(); 
                }; 
        },
        pixelate() { 
            this.canvas.height = this.img.height; 
            this.canvas.width = this.img.width;
        },




        
    }
}
</script>
<style scoped>

.contents { 
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>