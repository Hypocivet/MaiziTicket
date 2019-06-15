<template>
  <div class="sdDiv flex" @click="show">
    <div>
      <img :src="goods.poster" class="img">
    </div>
    <div>
      <div class="name">{{goods.name}}</div>
      <div class="small">{{goods.place}}</div>
      <div class="small">{{goods.time}}</div>
      <div class="price">￥{{getPrice()}}起</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["goods"],
  methods: {
    show() {
      this.$router.push({
        name: "details",
        params: {
          goods: this.goods
        }
      });
    },
    getPrice() {
      return this.goods.price.split(" ")[0];
    }
  }
};
</script>

<style scoped>
.sdDiv {
  width: 270px;
  height: 160px;
  overflow: hidden;
  margin-bottom: 40px;
  font-size: 12px;
  cursor: pointer;
}
.img {
  height: 160px;
}
.name {
  font-size: 15px;
  margin-left: 10px;
}
.small {
  color: grey;
  font-size: 10px;
  margin: 10px;
}
.small:hover {
  color: #ff1268;
}
.price {
  margin: 30px 10px;
  font-size: 15px;
  color: #ff1268;
}
</style>
