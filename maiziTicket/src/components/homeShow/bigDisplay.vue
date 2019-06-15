<template>
  <router-link :to="{name:'details',params:{goods:goods}}" class="big">
    <img :src="goods.poster" class="img">
    <div class="goodInfo">
      <div>{{goods.name}}</div>
      <div>￥{{getPrice()}}起</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["goods"],
  methods: {
    getPrice() {
      return this.goods.price.split(" ")[0];
    }
  }
};
</script>

<style scoped>
.big {
  width: 270px;
  height: 360px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.img {
  width: 270px;
}
.goodInfo {
  height: 120px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  color: #ffffff;
  font-weight: bolder;
}
.goodInfo > div:hover {
  color: #ff1268;
}
.goodInfo > div:nth-child(1) {
  margin: 25px;
}

.goodInfo > div:nth-child(2) {
  margin-left: 25px;
}
</style>
