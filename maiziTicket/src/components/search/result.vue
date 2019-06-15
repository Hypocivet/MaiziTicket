<template>
  <div class="result">
    <paginate name="pGoods" :list="goodsList" :per="20">
      <goods
        v-for="(good,index) in paginated('pGoods')"
        :key="index"
        :goods="good"
      ></goods>
    </paginate>
    <div class="page">
      <paginate-links for="pGoods" :show-step-links="true" class="flex"></paginate-links>
    </div>
  </div>
</template>

<script>
import goods from "./goods";

export default {
  props:['goodsList'],
  data() {
    return {
      isClick: true,
      paginate: ["pGoods"]
    };
  },
  components: {
    goods: goods
  },
  mounted() {
    setTimeout(() => {
      this.shown = true;
    }, 1000);
  },
  methods: {
    lately: function() {
      this.isClick = true;
    },
    newest: function() {
      this.isClick = false;
    }
  }
};
</script>

<style scoped>
.result {
  margin-top: 20px;
  border: 1px solid lightgrey;
}
.label {
  background: rgba(211, 211, 211, 0.5);
}
.label > div {
  width: 150px;
  height: 40px;
  padding-top: 15px;
  text-align: center;
}
.label > div:hover {
  background: #ffffff;
  color: #ff1268;
}
.onclick {
  background: #ffffff;
  color: #ff1268;
}
.page {
  width: 500px;
  height: 50px;
  margin: 30px;
}
</style>
