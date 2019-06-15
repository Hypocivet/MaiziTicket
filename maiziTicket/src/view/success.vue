<template>
  <div class="success center">
    <div class="flex text">
      {{this.$route.params.text}}成功！{{time}}秒后自动
      <div @click="toHome" class="red pointer">跳转至主页</div>......
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
  mounted() {
    timer = setInterval(() => {
      this.time--;
      if (this.time === 0) this.toHome();
    }, 1000);
  },
  methods: {
    toHome() {
      this.$store.commit("page","home")
      clearTimeout(timer);
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style scoped>
.success {
  height: 600px;
  border: 1px solid #dddddd;
  margin-bottom: 30px;
  position: relative;
}
.red {
  color: red;
}
.text{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
}
</style>
