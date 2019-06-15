<template>
  <div class="flex search" v-bind:class="{border:isChoose}">
    <div class="flex what">
      <img src="../../assets/header/search.png" alt class="img">
      <input
        type="text"
        class="input"
        ref="input"
        placeholder="搜索明星、演出、体育赛事"
        @focus="isChoose=!isChoose"
        @blur="isChoose=!isChoose"
      >
    </div>
    <div class="sButton" @click="search()">搜索</div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isChoose: false,
      searchTxt: "",
      notHome:false
    };
  },
  props:['isHome'],
  methods: {
    search: function() {
      this.searchTxt = this.$refs.input.value;
      this.$refs.input.value = "";
      this.$emit("data",this.$data);
      this.$router.push({
        name: "filter",
        params: {
          searchTxt: this.searchTxt
        }
      });
    }
  }
};
</script>

<style scoped>
.search {
  height: 50px;
  margin-top: 15px;
  border: 1px solid transparent;
  box-sizing: border-box;
}
.what {
  background: #f0f0f0;
  border-radius: 25px 0 0 25px;
}
.img {
  height: 20px;
  margin: 15px 20px;
}
.input {
  width: 300px;
  height: 30px;
  margin-top: 10px;
  outline: none;
  background: transparent;
  border: none;
}
.sButton {
  background: #ff1268;
  color: #ffffff;
  width: 50px;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 0px 25px 25px 0px;
  cursor: pointer;
}
.border {
  border: 1px solid #ff1268;
  border-radius: 25px;
}
</style>
