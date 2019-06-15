<template>
  <div class="details">
    <div class="flex tabs">
      <div class="tab pointer" @click="goods" v-bind:class="{cTab:cTab==='goods'}">商品详情</div>
      <div class="tab pointer" @click="notice" v-bind:class="{cTab:cTab==='notice'}">购票须知</div>
    </div>
    <div>
      <info v-show="cTab==='goods'"></info>
      <notice v-show="cTab==='notice'"></notice>
    </div>
  </div>
</template>

<script>
import info from "./info"
import notice from "./notice"
export default {
  data(){
    return{
      cTab:"goods"
    }
  },
  methods:{
    goods(){
      this.cTab = "goods";
    },
    notice(){
      this.cTab = "notice"
    }
  },
  components:{
    info:info,
    notice:notice
  }
};
</script>

<style scoped>
.details{
  margin-top:30px;
  border-top:1px solid #dddddd;
}
.tabs{
  border-bottom: 1px solid #dddddd;
}
.tab{
  padding:20px 40px;
}
.cTab{
  border:1px solid #dddddd;
  border-top:3px solid #ff1268;
  border-bottom: none;
}
</style>
