<template>
  <div class="flex">
    <div class="poster">
      <img :src="goods.poster" alt>
    </div>
    <div class="right">
      <div class="name">{{goods.name}}</div>
      <div class="time">时间：{{goods.time}}</div>
      <div class="place">场馆：{{goods.place}}</div>
      <div class="prices flex">
        选择票价：
        <div
          class="pointer price"
          @click="select(price)"
          ref="price"
          v-for="(price,index) in getPrice()"
          :key="index"
          v-bind:class="{sBorder:sPrice===price}"
        >
          {{price}}
          <div class="select" v-show="sPrice===price">
            <img src="../../assets/body/select.png" alt>
          </div>
        </div>
      </div>
      <div>
        <div class="flex">
          <div class="btn pointer" @click="buyTicket">购票</div>
        </div>
        <div class="flex admin" v-show="level==='admin'">
          <div class="btn pointer" @click="delTicket">删除商品</div>
          <div class="btn pointer" @click="alterTicket">修改商品信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sPrice: "",
      level: ""
    };
  },
  props: ["goods"],
  methods: {
    select(price) {
      this.sPrice = price;
    },
    getPrice() {
      return this.goods.price.split(" ");
    },
    buyTicket() {
      this.$router.push({
        name: "makeSure",
        params: {
          goods: this.goods,
          sPrice: this.sPrice
        }
      });
    },
    delTicket() {
      console.log(this.goods);
      var params = new URLSearchParams();
      params.append("goodsId", this.goods.ticketId);
      this.$ajax.post("/api/delTicket", params).then(response => {
        alert("商品已从库中移除");
      });
    },
    alterTicket() {
      this.$router.push({
        name: "alterGoods",
        params: {
          goods: this.goods
        }
      });
    }
  },
  mounted() {
    this.level = localStorage.getItem("class");
  }
};
</script>

<style scoped>
.poster {
  margin: 40px 0 0 30px;
}
.poster > img {
  width: 270px;
  height: 360px;
}
.right {
  margin: 40px 0 0 30px;
}
.right > div {
  margin-top: 30px;
}
.right > .name {
  font-size: 30px;
  font-weight: bolder;
  margin-top: 0;
}
.price {
  padding: 20px;
  border: 1px solid #dddddd;
  position: relative;
  margin-right: 20px;
}
.select {
  position: absolute;
  right: 0;
  bottom: -5px;
}
.select > img {
  width: 20px;
  height: 20px;
}
.sBorder {
  border: 1px solid #ff1268;
}
.btn {
  margin-left: 80px;
  border-radius: 10px;
  width: 150px;
  padding: 10px;
  text-align: center;
  background: #ff1268;
  color: #ffffff;
}
.admin {
  margin-top: 20px;
}
</style>
