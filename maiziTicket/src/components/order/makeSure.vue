<template>
  <div class="makeSure">
    <div class="title">选择收货地址</div>
    <div class="flex">
      <div class="site pointer" v-for="(site,index) in sites" :key="index" @click="choose=index">
        <div>{{site.name}}</div>
        <div>
          <div>{{site.site}}</div>
          <div>{{site.phone}}</div>
        </div>
        <div class="select" v-show="choose===index">
          <img src="../../assets/body/select.png" alt>
        </div>
      </div>
    </div>
    <div class="title">选择观演人</div>
    <div class="flex cBuyer">
      <div v-for="(buyer,index) in buyer" :key="index" class="buyer">
        <input
          class="pointer"
          type="checkbox"
          :checked="cBuyer===buyer.id"
          @change="change($event,buyer.id)"
        >
        {{buyer.name}}
        <div class="details" v-show="cBuyer===buyer.id">
          <div class="flex">
            <div class="proName">购票人姓名：</div>
            <div>{{buyer.name}}</div>
          </div>
          <div class="flex">
            <div class="proName">证件类型：</div>
            <div>{{buyer.type}}</div>
          </div>
          <div class="flex">
            <div class="proName">证件号码：</div>
            <div>{{buyer.number}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">订单信息</div>
    <div>
      <div class="flex head">
        <div>项目信息</div>
        <div>单价</div>
        <div>小计</div>
      </div>
      <div class="flex order">
        <div>
          <div class="flex">
            <div class="poster">
              <img :src="this.$route.params.goods.poster" alt>
            </div>
            <div class="info">
              <div>{{this.$route.params.goods.name}}</div>
              <div>{{this.$route.params.goods.time}}</div>
              <div>{{this.$route.params.goods.place}}</div>
            </div>
          </div>
        </div>
        <div class="price">{{this.$route.params.sPrice}}</div>
        <div class="price">{{this.$route.params.sPrice}}</div>
      </div>
      <div class="sureInfo">
        <div class="flex aPrice">实付款：
          <div>￥{{this.$route.params.sPrice}}</div>
        </div>
        <div>寄送至：{{this.sites[choose].site}}</div>
        <div>收货人：{{this.sites[choose].name}} {{this.sites[choose].phone}}</div>
      </div>
      <div class="flex submit">
        <div></div>
        <div class="btn pointer" @click="submit">提交订单</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sites: [],
      buyer: [],
      choose: "",
      cBuyer: "",
      orderId: ""
    };
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("username", this.$store.state.currentUser);
    this.$ajax.post("/api/getSite", params).then(response => {
      this.sites = response.data;
      for (var i = 0; i < this.sites.length; i++) {
        if (this.sites[i].choose === "1") this.choose = i;
      }
    });
    this.$ajax.post("/api/getBuyer", params).then(response => {
      this.buyer = response.data;
    });
  },
  methods: {
    change(e, id) {
      if (e.path[0].checked) {
        this.cBuyer = id;
      } else this.cBuyer = "";
    },
    submit() {
      var date = new Date();
      var params = new URLSearchParams();
      this.orderId =
        this.$store.state.currentUser +
        date.getFullYear() +
        (date.getMonth() + 1) +
        date.getDate() +
        date.getHours() +
        date.getMinutes();
      params.append("username", this.$store.state.currentUser);
      params.append("orderId", this.orderId);
      params.append("ticketId", this.$route.params.goods.ticketId);
      params.append("counts", "1");
      params.append("orderState", "订单关闭");
      params.append("siteId", this.sites[this.choose].id);
      params.append("buyerId", this.cBuyer);
      params.append("sPrice", this.$route.params.sPrice);
      this.$ajax.post("/api/submitOrder", params).then(response => {
        if (response.data) {
          this.$router.push({
            name: "pay",
            params: {
              orderId: this.orderId
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.makeSure {
  margin: 20px 100px;
}
.site {
  background: url(https://img.alicdn.com/tfs/TB1.LilIAyWBuNjy0FpXXassXXa-235-104.png)
    no-repeat;
  width: 205px;
  height: 80px;
  padding: 12px 15px;
  margin-right: 15px;
  font-size: 12px;
  border: 1px solid #e3e3e3;
  position: relative;
}
.site > div:nth-child(1) {
  border-bottom: 1px solid #e3e3e3;
}
.site > div {
  padding: 5px;
}
.select {
  position: absolute;
  right: -6px;
  bottom: -9px;
}
.select > img {
  width: 25px;
  height: 25px;
}
.title {
  padding: 20px;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 20px;
}
.cBuyer {
  flex-wrap: wrap;
}
.buyer {
  margin-right: 20px;
  width: 200px;
}
.details {
  width: 100%;
  border: 1px solid #e3e3e3;
  margin-top: 10px;
  font-size: 12px;
  padding: 20px;
}
.details > div {
  margin: 5px 0;
}
.proName {
  width: 75px;
}
.poster > img {
  width: 62px;
  height: 80px;
}
.head {
  background: #ebecf0;
  padding: 10px 20px;
  text-align: center;
}
.head > div {
  width: 300px;
}
.poster {
  margin: 10px;
}
.poster + div {
  margin-top: 10px;
  font-size: 12px;
}
.order {
  position: relative;
}
.order > div:nth-child(1) {
  margin: 20px;
}
.price {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.order > div.price:nth-child(2) {
  left: 460px;
}
.order > div.price:nth-child(3) {
  left: 760px;
}
.sureInfo {
  background: #ebecf0;
  padding: 10px 20px;
  text-align: right;
}
.aPrice {
  padding-left: 800px;
  width: 200px;
}
.aPrice > div {
  font-size: 25px;
}
.submit {
  justify-content: space-between;
}
.btn {
  padding: 10px 30px;
  background: #ff1268;
  color: #fff;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
