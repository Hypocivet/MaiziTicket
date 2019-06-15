<template>
  <div class="center filter">
    <div @click="search()">
      共
      <span class="num">{{num}}</span>
      件商品
    </div>
    <condition @query="query"></condition>
    <result :goodsList="goodsList"></result>
  </div>
</template>

<script>
import condition from "./condition";
import result from "./result";
export default {
  data: function() {
    return {
      num: 0,
      goodsList: []
    };
  },
  components: {
    condition: condition,
    result: result
  },
  mounted() {
    //向后台请求查询结果
    if (this.$route.params.type) {
      var params = new URLSearchParams();
      params.append("type", this.$route.params.type);
      this.$ajax.post("/api/getInfoByType", params).then(response => {
        this.goodsList = response.data;
        this.num = this.goodsList.length;
      });
    }else if(this.$route.params.searchTxt){
      var params = new URLSearchParams();
      params.append("searchTxt",this.$route.params.searchTxt);
      this.$ajax.post("/api/getInfoByTxt",params).then(response=>{
        this.goodsList = response.data;
        this.num = this.goodsList.length;
      })
    }else if(this.$route.params.city){
      var params = new URLSearchParams();
      params.append("city",this.$route.params.city);
      this.$ajax.post("/api/getInfoByCity",params).then(response=>{
        this.goodsList = response.data;
        this.num = this.goodsList.length;
      })
    }
  },
  methods: {
    query(value){
      this.goodsList = value;
      this.num = this.goodsList.length;
    }
  }
};
</script>

<style scoped>
.num {
  color: #ff1268;
}
.filter {
  margin-top: 20px;
}
</style>
