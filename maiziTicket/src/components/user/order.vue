<template>
  <div>
    <div class="title">订单管理</div>
    <div>
      <div class="head flex">
        <div>项目名称</div>
        <div>票名张数</div>
        <div>订单金额</div>
        <div>交易状态</div>
      </div>
      <order-div v-for="(order,index) in orderList" :key="index" :order="order"></order-div>
    </div>
  </div>
</template>

<script>
import orderDiv from "./orderDiv";
export default {
  data() {
    return {
      orderList: []
    };
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("username", this.$store.state.currentUser);
    this.$ajax.post("/api/getOrder", params).then(response => {
      this.orderList = response.data;
    });
  },
  components: {
    orderDiv: orderDiv
  }
};
</script>

<style scoped>
.title {
  padding: 20px;
  border-bottom: 1px solid #dddddd;
}
.content {
  margin: 10px;
}
.head{
  background: #eff2f4;
  margin: 20px;
  padding:10px;
  justify-content: space-around;
}
</style>
