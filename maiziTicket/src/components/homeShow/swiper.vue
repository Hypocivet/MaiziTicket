<template>
  <div class="sHeader center">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide class="swiper" v-for="swiperImg in swiperImg" :key="swiperImg">
        <img src="../../assets/body/swiper/test.jpg" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      swiperOption: {
        loop:true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true
        }
      },
      swiperImg:[
        "I'm Slide 1"
      ]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.swiper {
  height: 320px;
}
</style>
