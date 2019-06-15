<template>
  <div>
    <swiper></swiper>
    <ticket-type></ticket-type>
    <div class="display">
      <display v-for="(display,index) in display" :key="index" :name="display" v-if="index<8"></display>
    </div>
  </div>
</template>

<script>
import swiper from "./swiper";
import ticketType from "./ticketType";
import display from "./display";

export default {
  data: function() {
    return {
      display: [
        "演唱会",
        "话剧歌剧",
        "体育赛事",
        "儿童亲子",
        "度假休闲",
        "音乐会",
        "曲苑杂坛",
        "舞蹈芭蕾",
        "动漫",
        "旅游展览"
      ]
    };
  },
  components: {
    swiper: swiper,
    ticketType: ticketType,
    display: display
  }
};
</script>

<style scoped>
</style>
