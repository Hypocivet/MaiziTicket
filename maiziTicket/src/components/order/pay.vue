<template>
  <div>
    <div class="pay pointer" @click="pay">
      确认支付
    </div>
  </div>
</template>

<script>
var timer;
export default {
  data() {
    return {
      time: 3
    };
  },
  methods: {
    pay() {
      var params = new URLSearchParams();
      params.append("orderId", this.$route.params.orderId);
      this.$ajax.post("/api/payOrder", params).then(response => {
        if (response) {
          timer = setInterval(() => {
            this.time--;
            if (this.time === 0) this.toHome();
          }, 1000);
        }
      });
    },
    toHome() {
      clearTimeout(timer);
      this.$router.push({
        name: "success",
        params: {
          text: "支付"
        }
      });
    }
  }
};
</script>

<style scoped>
.pay {
  margin: 200px auto;
  width: 400px;
  border:1px solid red;
  text-align: center;
  padding:20px;
  border-radius: 20px;
}
.pay > img {
  width: 100%;
}
</style>
