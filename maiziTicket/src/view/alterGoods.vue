<template>
  <div class="center alter">
    <div class="title">修改商品信息</div>
    <div class="form">
      <div class="input">
        商品名：
        <input type="text" v-model="goodsName">
      </div>
      <div class="flex">
        商品图片：
        <img :src="goodsImg" alt>
        <input type="file" @change="img2base64($event,getgoodsImg)" ref="goodsImg" class="pic">
      </div>
      <div class="input">
        商品价格：
        <input type="text" v-model="goodsPrice">
      </div>
      <div class="input">
        场馆：
        <input type="text" v-model="place">
      </div>
      <div class="input">
        城市：
        <input type="text" v-model="city">
      </div>
      <div class="input">
        分类：
        <input type="text" v-model="type">
      </div>
      <div class="btn pointer" @click="alterGoods">确认修改</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: "",
      goodsName: "",
      goodsPrice: "",
      goodsCounts: "",
      goodsImg: "",
      place:"",
      city:"",
      type:""
    };
  },
  mounted() {
    this.goods = this.$route.params.goods;
    this.goodsName = this.goods.name;
    this.goodsPrice = this.goods.price;
    this.goodsCounts = this.goods.counts;
    this.goodsImg = this.goods.poster;
    this.place = this.goods.place;
    this.city = this.goods.city;
    this.type = this.goods.type;
  },
  methods: {
    img2base64(e, callback) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        callback(e.target.result);
      };
    },
    getgoodsImg(goodsImg) {
      this.goodsImg = goodsImg;
    },
    alterGoods() {
      var params = new URLSearchParams();
      params.append("ticketId", this.goods.ticketId);
      params.append("name", this.goodsName);
      params.append("poster", this.goodsImg);
      params.append("price", this.goodsPrice);
      params.append("counts", this.goodsCounts);
      params.append("place",this.place);
      params.append("type",this.type);
      params.append("city",this.city);
      this.$ajax.post("/api/alterTicket", params).then(response => {
        if (response.data) {
          this.$router.push({
            name: "success",
            params: {
              text: "修改"
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.alter {
  border: 1px solid #e3e3e3;
  padding-bottom: 100px;
}
.title {
  padding: 30px;
  border-bottom: 1px solid #e3e3e3;
}
.form {
  margin-left: 200px;
}
.input {
  width: 247px;
  margin: 20px 0;
  text-align: right;
}
img {
  width: 118px;
  height: 160px;
  margin-left: 7px;
}
.pic {
  margin-left: 20px;
}
.btn {
  width: 100px;
  text-align: center;
  border: 10px solid transparent;
  background: #ff1268;
  border-radius: 10px;
  color: #ffffff;
}
</style>
