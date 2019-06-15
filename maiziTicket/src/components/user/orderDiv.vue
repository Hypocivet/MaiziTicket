<template>
  <div class="order">
    <div class="orderId">订单号：{{order.orderId}}</div>
    <div class="flex orderInfo">
      <div class="flex">
        <div>
          <img :src="goods[0].poster" alt>
        </div>
        <div class="goodsInfo">
          <div>{{goods[0].name}}</div>
          <div>{{goods[0].time}}</div>
          <div>{{goods[0].place}}</div>
        </div>
      </div>
      <div class="vCenter">{{order.counts}}</div>
      <div class="vCenter">￥{{order.sPrice}}</div>
      <div class="vCenter">
        <div>{{order.orderState}}</div>
        <div class="pointer show" @click="show=!show">订单详情</div>
      </div>
    </div>
    <div v-show="show" class="details">
      <div class="info flex">
        <div>
          <div class="title">购票人信息</div>
          <div class="detailsInfo">
            <div>购票人：{{buyer[0].name}}</div>
            <div>身份证号：{{buyer[0].number}}</div>
          </div>
        </div>
        <div>
          <div class="title">收货地址</div>
          <div class="detailsInfo">
            <div>联系方式：{{site[0].phone}}</div>
            <div>收货地址：{{site[0].site}}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="title">物流信息</div>
        <div class="detailsInfo">123</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      goods: [],
      show: false,
      buyer: "",
      site: ""
    };
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("ticketId", this.order.ticketId);
    this.$ajax.post("/api/getInfoById", params).then(response => {
      this.goods = response.data;
    });
    var buyerP = new URLSearchParams();
    buyerP.append("buyerId", this.order.buyerId);
    this.$ajax.post("/api/getBuyerById", buyerP).then(response => {
      this.buyer = response.data;
    });
    var siteP = new URLSearchParams();
    siteP.append("siteId", this.order.siteId);
    this.$ajax.post("/api/getSiteById", siteP).then(response => {
      this.site = response.data;
    });
  }
};
</script>

<style scoped>
.order {
  margin: 20px;
  border: 1px solid #e3e3e3;
}
.orderId {
  background: #eff2f4;
  padding: 10px;
}
.orderInfo > div {
  margin: 10px 40px;
  font-size: 12px;
}
.goodsInfo {
  margin: 10px;
}
img {
  width: 62px;
  height: 80px;
}
.vCenter {
  padding: 30px 30px 0 30px;
}
.vCenter:nth-last-child(3) {
  margin-left: 10px;
}
.vCenter:nth-last-child(2) {
  margin-left: 100px;
}
.vCenter:nth-last-child(1) {
  margin-left: 80px;
}
.show:hover {
  color: #ff1268;
}
.details {
  border-top: 1px solid #e3e3e3;
}
.info {
  justify-content: space-between;
  border-bottom: 1px solid #e3e3e3;
}
.title {
  font-size: 20px;
  color: #ff1268;
  text-align: center;
  padding-top:20px;
}
.info > div {
  width: 50%;
}
.info > div:nth-child(1) {
  border-right: 1px solid #e3e3e3;
}
.detailsInfo {
  padding: 30px;
}
</style>
