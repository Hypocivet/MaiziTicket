<template>
  <div class="flex">
    <div class="cHead"></div>
    <div>
      <div class="headImg">
        <img :src="headImg" alt>
      </div>
      <div class="submit pointer" @click="submitHeadImg">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["headImg"],
  methods: {
    submitHeadImg() {}
  }
};
</script>

<style scoped>
.cHead {
  width: 500px;
  height: 400px;
  margin: 30px;
  border: 1px solid #dddddd;
}
.headImg {
  width: 150px;
  height: 150px;
  border: 1px solid #dddddd;
  margin: 30px 50px;
}
.submit {
  margin: 68px;
  padding: 10px;
  width: 100px;
  background: #ff1268;
  color: #ffffff;
  text-align: center;
  border-radius: 5px;
}
</style>
