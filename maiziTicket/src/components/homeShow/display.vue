<template>
  <div class="center displayDiv">
    <div class="flex title">
      <div>{{name}}</div>
      <div class="flex">
        <div class="pointer" v-show="level==='admin'" @click="add">添加商品</div>
        <div v-show="level==='admin'">|</div>
        <div class="pointer" @click="all">查看全部</div>
      </div>
    </div>
    <div class="flex good">
      <big-display :goods="goodsList[0]"></big-display>
      <small-display :goods="goodsList"></small-display>
    </div>
  </div>
</template>

<script>
import bigDisplay from "./bigDisplay";
import smallDisplay from "./smallDisplay";

export default {
  props: ["name"],
  data() {
    return {
      goodsList: [],
      level:""
    };
  },
  components: {
    bigDisplay: bigDisplay,
    smallDisplay: smallDisplay
  },
  mounted() {
    this.level = localStorage.getItem("class");
    var params = new URLSearchParams();
    params.append("type", this.name);
    this.$ajax.post("/api/getInfoByType", params).then(response => {
      this.goodsList = response.data;
    });
  },
  methods: {
    all() {
      this.$router.push({
        name: "filter",
        params: {
          type: this.name
        }
      });
    },
    add(){
      this.$router.push({
        name:"addTicket",
        params:{
          type:this.name
        }
      })
    }
  }
};
</script>

<style scoped>
.displayDiv {
  height: 450px;
  border: 1px solid lightgrey;
  margin-top: 20px;
}
.title {
  margin: 20px;
  justify-content: space-between;
}
.title > div:nth-child(1) {
  font-size: 20px;
  font-weight: bolder;
}
.title > div:nth-child(2) {
  font-size: 15px;
  color: grey;
}
.title > div:nth-child(2) > div {
  padding: 0 10px;
}
.good {
  margin: 0 20px;
  justify-content: space-between;
}
</style>
