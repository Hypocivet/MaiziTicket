<template>
  <div class="tHeader center flex">
    <div v-for="name in type" class="type" :key="name" @click="query(name)">
      <div class="background" ref="typeImg"></div>
      <div class="name">{{name}}</div>
    </div>
  </div>
</template>

<script>
import backgroundImg from "../../assets/body/type.png";
export default {
  data: function() {
    return {
      type: [
        "演唱会",
        "话剧歌剧",
        "体育赛事",
        "儿童亲子",
        "度假休闲",
        "音乐会",
        "曲苑杂坛",
        "舞蹈芭蕾",
        "动漫",
        "旅游展览"
      ]
    };
  },
  methods: {
    query: function(name) {
      this.$router.push({
        name: "filter",
        params: {
          type: name
        }
      });
    }
  },
  mounted() {
    var typeImg = this.$refs.typeImg;
    for (let i = 0; i < typeImg.length; i++) {
      typeImg[i].style.background =
        "url(" + backgroundImg + ") no-repeat -2px " + -75 * i + "px";
      typeImg[i].style.backgroundSize = "60px";
    }
  }
};
</script>

<style scoped>
.tHeader {
  border: 1px solid lightgrey;
  height: 100px;
  margin-top: 20px;
  justify-content: space-around;
}
.type {
  cursor: pointer;
  width: 200px;
}
.type:hover {
  color: #ff1268;
}
.name {
  text-align: center;
}
.background {
  width: 50px;
  height: 70px;
  margin: 0px 30px;
}
</style>
