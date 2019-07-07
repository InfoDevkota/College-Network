<template>
  <q-layout>
    <q-page-container>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-page v-show="showSimulatedReturnData" :style="{display: 'flex'}">
          <div class="row" :style="{flex: 1}">
              <div class="col">

    <q-parallax
    :style="{ height: 100+'%' }"
    >
    <template v-slot:media>
        <img src="https://cdn.quasar.dev/img/parallax2.jpg">
      </template>
            <template v-slot:content="scope">
                <div
          class="absolute column items-center"
          :style="{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }"
        >
                  <q-carousel
                  :style="{ width: 100+'%', height: 100+'%' }"
     animated
      v-model="slide"
      arrows
      swipeable
      infinite
      autoplay
    >
      <q-carousel-slide :name="1" img-src="">
          <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>

      </q-carousel-slide>
      <q-carousel-slide :name="2" img-src="">
          <div class="absolute-bottom custom-caption">
          <div class="text-h2">Second stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>

      </q-carousel-slide>
    </q-carousel>
                </div>
          </template>
    </q-parallax>
              </div>
            <router-view></router-view>
          </div>
        </q-page>
      </transition>
      <q-inner-loading :showing="visible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-page-container>
  </q-layout>
</template>
<script>
// Don't forget to specify which animations
// you are using in quasar.conf.js > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  data () {
    return {
      visible: false,
      slide: 1,
      showSimulatedReturnData: false
    }
  },
  created () {
    this.showTextLoading()
  },
  methods: {
    //    myTweak (offset) {
    //   // "offset" is a Number (pixels) that refers to the total
    //   // height of header + footer that occupies on screen,
    //   // based on the QLayout "view" prop configuration

    //   // this is actually what the default style-fn does in Quasar
    //   return {  }
    // },
    showTextLoading () {
      this.visible = true
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.visible = false
        this.showSimulatedReturnData = true
      }, 3000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.custom-caption
  text-align center
  padding 12px
  color white
  background-color rgba(0, 0, 0, .3)
</style>
